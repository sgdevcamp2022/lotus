package com.example.auth.Oauth2;

import com.example.auth.Entity.RefreshToken;
import com.example.auth.Repository.RedisRepository;
import com.example.auth.Security.TokenProvider;
import com.example.auth.Vo.TokenInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;
    private final RedisRepository redisRepository;
    private ObjectMapper objectMapper=new ObjectMapper();




    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse, Authentication authentication)
            throws IOException, ServletException {


        OAuth2User oAuth2User=(OAuth2User)authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        TokenInfo jwt = login(authentication, attributes.get("email").toString());


        String[] path = httpServletRequest.getRequestURI().split("/");
        Provider provider = Provider.valueOf(path[path.length - 1].toUpperCase());
        String oauthId = authentication.getName();

        String uri = UriComponentsBuilder.fromUriString("http://localhost:8080/social")
                .queryParam("provider", provider)
                .queryParam("oauthId", oauthId)
                .queryParam("grantType", jwt.getGrantType())
                .queryParam("accessToken", jwt.getAccessToken())
                .queryParam("refreshToken", jwt.getRefreshToken())
                .build().toUriString();

        httpServletResponse.sendRedirect(uri);
    }


        private TokenInfo login(Authentication authentication, String email) {

        SecurityContextHolder.getContext().setAuthentication(authentication);

        TokenInfo jwt = tokenProvider.createToken(authentication);
        RefreshToken refreshTokenInRedis = findRefreshToken(email);

        if (Objects.isNull(refreshTokenInRedis)) {    //redis에 refreshtoken 없으면 최초로그인
            RefreshToken redisRefreshToken = new RefreshToken(jwt.getRefreshToken(),
                    email);
            redisRepository.save(redisRefreshToken);
        } else {   //있으면 최초로그인x
            jwt.setRefreshToken(null);
        }

        return jwt;
    }

    private RefreshToken findRefreshToken(String username) {
        return redisRepository.findRefreshTokenByUsername(username);
    }
}