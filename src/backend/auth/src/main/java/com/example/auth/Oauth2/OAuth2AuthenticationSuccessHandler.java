package com.example.auth.Oauth2;

import com.example.auth.Entity.AccessToken;
import com.example.auth.Entity.RefreshToken;
import com.example.auth.Entity.User;
import com.example.auth.Repository.AccessTokenRepository;
import com.example.auth.Repository.RefreshTokenRepository;
import com.example.auth.Repository.UserRepository;
import com.example.auth.Jwt.TokenProvider;
import com.example.auth.Dto.Response.LoginResponse;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final AccessTokenRepository accessTokenRepository;

    public OAuth2AuthenticationSuccessHandler(TokenProvider tokenProvider,
            RefreshTokenRepository refreshTokenRepository, UserRepository userRepository,
            AccessTokenRepository accessTokenRepository) {
        this.tokenProvider = tokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
        this.accessTokenRepository = accessTokenRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse, Authentication authentication)
            throws IOException, ServletException {

        System.out.println("authentication = " + authentication);
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        System.out.println("oAuth2User = " + oAuth2User);
        Map<String, Object> attributes = oAuth2User.getAttributes();
        System.out.println("attributes = " + attributes);

        String[] path = httpServletRequest.getRequestURI().split("/");
        String provider = Provider.valueOf(path[path.length - 1].toUpperCase()).toString();
        String oauthId = authentication.getName();
        String email;

        if (provider.equals("KAKAO")) {
            Map<String, Object> kakao_account = (Map<String, Object>) attributes.get(
                    "kakao_account");
            email = kakao_account.get("email").toString();
        } else {
            email = attributes.get("email").toString();
        }

        System.out.println("email = " + email);

        LoginResponse jwt = login(authentication, email, provider);

        //   String uri = UriComponentsBuilder.fromUriString("http://localhost:8080/social")
        //String uri = UriComponentsBuilder.fromUriString("http://localhost:3090/login")
        String uri = UriComponentsBuilder.fromUriString("http://15.164.192.183:8080")
                .queryParam("provider", provider)
                .queryParam("oauthId", oauthId)
                .queryParam("grantType", jwt.getGrantType())
                .queryParam("accessToken", jwt.getAccessToken())
                .queryParam("refreshToken", jwt.getRefreshToken())
                .build().toUriString();

        httpServletResponse.sendRedirect(uri);
    }


    private LoginResponse login(Authentication authentication, String email, String provider) {

         SecurityContextHolder.getContext().setAuthentication(authentication);

        Optional<User> oneByEmail = userRepository.findOneByEmailAndProvider(email, provider);
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

    private RefreshToken findRefreshToken(Long userId) {
        return refreshTokenRepository.findRefreshTokenByUserId(userId);
    }
}