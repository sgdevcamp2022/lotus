package com.example.auth.Service;

import com.example.auth.Dto.Request.LoginRequest;
import com.example.auth.Dto.Response.DefaultResponse;
import com.example.auth.Dto.Response.ResponseMessage;
import com.example.auth.Dto.Response.StatusCode;
import com.example.auth.Entity.AccessToken;
import com.example.auth.Entity.RefreshToken;
import com.example.auth.Entity.User;
import com.example.auth.Repository.AccessTokenRepository;
import com.example.auth.Repository.RefreshTokenRepository;
import com.example.auth.Repository.UserRepository;
import com.example.auth.Dto.Response.LoginResponse;
import com.example.auth.Jwt.TokenProvider;

import com.example.auth.Util.SecurityUtil;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import org.springframework.transaction.annotation.Transactional;


@Service
public class AuthService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final AccessTokenRepository accessTokenRepository;

    public AuthService(AuthenticationManagerBuilder authenticationManagerBuilder,
            TokenProvider tokenProvider,
            RefreshTokenRepository refreshTokenRepository,
            UserRepository userRepository,
            AccessTokenRepository accessTokenRepository) {

        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.tokenProvider = tokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
        this.accessTokenRepository = accessTokenRepository;
    }

    @Transactional
    public LoginResponse login(LoginRequest loginDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(),
                        loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject()
                .authenticate(authenticationToken);

        Optional<User> oneByEmail = userRepository.findOneByEmail(loginDto.getEmail());
        Long userId = oneByEmail.get().getUserId();

        LoginResponse jwt = tokenProvider.createToken(authentication, userId);

        RefreshToken refreshTokenInRedis = findRefreshToken(userId);

        if (Objects.isNull(refreshTokenInRedis)) {    //redis에 refreshtoken 없으면 최초로그인
            RefreshToken redisRefreshToken = new RefreshToken(jwt.getRefreshToken(),
                    userId);
            refreshTokenRepository.save(redisRefreshToken);
        } else {   //있으면 최초로그인x
            jwt.setRefreshToken(null);
        }

        Optional<AccessToken> accessTokenByUserId = accessTokenRepository.findAccessTokenByUserId(
                userId);
        if (accessTokenByUserId.isPresent()) {  //로그아웃한 유저가 다시 로그인하면
            accessTokenRepository.delete(accessTokenByUserId.get());    //redis에 남아있던 accesstoken 제거
        }

        return jwt;
    }


    @Transactional
    public void logout(String accessToken, String refreshToken, Long userId) {
        long remainMilliSeconds = tokenProvider.getRemainMilliSeconds(accessToken);
        System.out.println("remainMilliSeconds = " + remainMilliSeconds);
        System.out.println("refreshToken = " + refreshToken);
        RefreshToken refreshTokenByUserId = refreshTokenRepository.findRefreshTokenByUserId(userId);
        refreshTokenRepository.delete(refreshTokenByUserId);

        AccessToken acccessTokenInRedis = new AccessToken(userId, accessToken,
                remainMilliSeconds / 1000);
        Long expiration = acccessTokenInRedis.getExpiration();
        System.out.println("expiration = " + expiration);

        accessTokenRepository.save(acccessTokenInRedis);
    }



    @Transactional(readOnly = true)
    public RefreshToken findRefreshToken(Long userId) {
        return refreshTokenRepository.findRefreshTokenByUserId(userId);
    }

    public boolean validateRefreshToken(RefreshToken refreshTokenInRedis,
            String refreshTokenInHeaders) {
        System.out.println("refreshTokenInRedis = " + refreshTokenInRedis);
        System.out.println("refreshTokenInHeaders = " + refreshTokenInHeaders);

        if (Objects.isNull(refreshTokenInRedis)) {    //refreshtoken이 만료됐을때 로그인 요청
            return false;
        } else {   //refreshtoken이 존재할때
            System.out.println("refreshTokenInRedis.getRefreshToken() = "
                    + refreshTokenInRedis.getRefreshToken());
            if (!refreshTokenInRedis.getRefreshToken().equals(refreshTokenInHeaders)) {
                System.out.println("토큰의 유저 정보가 일치하지 않습니다.");
                return false;
            } else {
                return true;
            }

        }


    }

    public DefaultResponse reissueAccessToken(String accessTokenInHeaders, String refreshTokenInHeaders) {
        Long userId = tokenProvider.getUserIdFromAccessToken(accessTokenInHeaders);
        RefreshToken refreshTokenInRedis = findRefreshToken(userId);

        if (Objects.isNull(refreshTokenInRedis)) {    //refreshtoken이 만료됐을때 로그인 요청
            return new DefaultResponse(StatusCode.RE_LOGIN, ResponseMessage.LOGIN_AGAIN, null);
        } else {   //refreshtoken이 존재할때
            System.out.println("refreshTokenInRedis.getRefreshToken() = "
                    + refreshTokenInRedis.getRefreshToken());
            if (!refreshTokenInRedis.getRefreshToken()
                    .equals(refreshTokenInHeaders)) {   //토큰 정보가 일치하지 않을때
                System.out.println("토큰의 유저 정보가 일치하지 않습니다.");
                return new DefaultResponse(StatusCode.TOKEN_INVALID, ResponseMessage.TOKEN_INVALID,
                        null);
            } else {
                final Authentication authentication = SecurityContextHolder.getContext()
                        .getAuthentication();
                String accessToken = tokenProvider.createAccessToken(authentication,userId);
                return new DefaultResponse(StatusCode.OK, ResponseMessage.TOKEN_REISSUE,
                        accessToken);
            }
        }

//        System.out.println("refreshTokenInRedis" + refreshTokenInRedis);
//        System.out.println("refreshTokenInHeaders = " + refreshTokenInHeaders);
//
//        if(validateRefreshToken(refreshTokenInRedis,refreshTokenInHeaders)){
//            final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            String accessToken = tokenProvider.createAccessToken(authentication);
//            return accessToken;
//        }
//        else{
//            System.out.println("refresh token이 유효하지 않습니다");
//            return null;
//        }

    }

}