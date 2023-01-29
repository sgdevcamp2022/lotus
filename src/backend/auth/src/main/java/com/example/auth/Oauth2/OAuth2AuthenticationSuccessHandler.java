package com.example.auth.Oauth2;

import com.example.auth.Entity.RefreshToken;
import com.example.auth.Entity.User;
import com.example.auth.Repository.RedisRepository;
import com.example.auth.Repository.UserRepository;
import com.example.auth.Security.TokenProvider;
import com.example.auth.Vo.TokenInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
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
@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;
    private final RedisRepository redisRepository;
    private final UserRepository userRepository;

    public OAuth2AuthenticationSuccessHandler(TokenProvider tokenProvider,
            RedisRepository redisRepository, UserRepository userRepository) {
        this.tokenProvider = tokenProvider;
        this.redisRepository = redisRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse, Authentication authentication)
            throws IOException, ServletException {

        System.out.println("authentication = " + authentication);
        OAuth2User oAuth2User=(OAuth2User)authentication.getPrincipal();
        System.out.println("oAuth2User = " + oAuth2User);
        Map<String, Object> attributes = oAuth2User.getAttributes();
        System.out.println("attributes = " + attributes);



        String[] path = httpServletRequest.getRequestURI().split("/");
        String provider = Provider.valueOf(path[path.length - 1].toUpperCase()).toString();
        String oauthId = authentication.getName();
        String email;
        
        if(provider.equals("KAKAO")){
            Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");
            email = kakao_account.get("email").toString();
        }
        else{
            email = attributes.get("email").toString();
        }

        System.out.println("email = " + email);

        TokenInfo jwt = login(authentication, email, provider);

        String uri = UriComponentsBuilder.fromUriString("http://localhost:8080/social")
                .queryParam("provider", provider)
                .queryParam("oauthId", oauthId)
                .queryParam("grantType", jwt.getGrantType())
                .queryParam("accessToken", jwt.getAccessToken())
                .queryParam("refreshToken", jwt.getRefreshToken())
                .build().toUriString();

        httpServletResponse.sendRedirect(uri);
    }


        private TokenInfo login(Authentication authentication, String email, String provider) {

        SecurityContextHolder.getContext().setAuthentication(authentication);



            Optional<User> oneByEmail = userRepository.findOneByEmailAndProvider(email,provider);
            Long userId = oneByEmail.get().getUserId();

        TokenInfo jwt = tokenProvider.createToken(authentication,userId);
        RefreshToken refreshTokenInRedis = findRefreshToken(email);

        if (Objects.isNull(refreshTokenInRedis)) {    //redis에 refreshtoken 없으면 최초로그인
            RefreshToken redisRefreshToken = new RefreshToken(jwt.getRefreshToken(),
                    userId);
            redisRepository.save(redisRefreshToken);
        } else {   //있으면 최초로그인x
            jwt.setRefreshToken(null);
        }

        return jwt;
    }

    private RefreshToken findRefreshToken(String username) {
        return redisRepository.findRefreshTokenByEmail(username);
    }
}