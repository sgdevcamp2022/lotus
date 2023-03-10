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

        if (Objects.isNull(refreshTokenInRedis)) {    //redis??? refreshtoken ????????? ???????????????
            RefreshToken redisRefreshToken = new RefreshToken(jwt.getRefreshToken(),
                    userId);
            refreshTokenRepository.save(redisRefreshToken);
        } else {   //????????? ???????????????x
            jwt.setRefreshToken(null);
        }

        Optional<AccessToken> accessTokenByUserId = accessTokenRepository.findAccessTokenByUserId(
                userId);
        if (accessTokenByUserId.isPresent()) {  //??????????????? ????????? ?????? ???????????????
            accessTokenRepository.delete(accessTokenByUserId.get());    //redis??? ???????????? accesstoken ??????
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

        if (Objects.isNull(refreshTokenInRedis)) {    //refreshtoken??? ??????????????? ????????? ??????
            return false;
        } else {   //refreshtoken??? ????????????
            System.out.println("refreshTokenInRedis.getRefreshToken() = "
                    + refreshTokenInRedis.getRefreshToken());
            if (!refreshTokenInRedis.getRefreshToken().equals(refreshTokenInHeaders)) {
                System.out.println("????????? ?????? ????????? ???????????? ????????????.");
                return false;
            } else {
                return true;
            }

        }


    }

    public DefaultResponse reissueAccessToken(String accessTokenInHeaders, String refreshTokenInHeaders) {

        RefreshToken refreshTokenInRedis = refreshTokenRepository.findRefreshTokenByRefreshToken(
                refreshTokenInHeaders);

        if (Objects.isNull(refreshTokenInRedis)) {    //refreshtoken??? ??????????????? ????????? ??????
            return new DefaultResponse(StatusCode.RE_LOGIN, ResponseMessage.LOGIN_AGAIN, null);
        } else {   //refreshtoken??? ????????????
            System.out.println("refreshTokenInRedis.getRefreshToken() = "
                    + refreshTokenInRedis.getRefreshToken());
            if (!refreshTokenInRedis.getRefreshToken()
                    .equals(refreshTokenInHeaders)) {   //?????? ????????? ???????????? ?????????
                System.out.println("????????? ?????? ????????? ???????????? ????????????.");
                return new DefaultResponse(StatusCode.TOKEN_INVALID, ResponseMessage.TOKEN_INVALID,
                        null);
            } else {
                final Authentication authentication = SecurityContextHolder.getContext()
                        .getAuthentication();
                Long userId = refreshTokenInRedis.getUserId();
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
//            System.out.println("refresh token??? ???????????? ????????????");
//            return null;
//        }

    }

}