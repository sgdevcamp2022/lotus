package com.example.auth.Oauth2;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse, Authentication authentication)
            throws IOException, ServletException {
        log.info("성공!");
        String[] path = httpServletRequest.getRequestURI().split("/");
        Provider provider = Provider.valueOf(path[path.length - 1].toUpperCase());
        String oauthId = authentication.getName();

        String uri = UriComponentsBuilder.fromUriString("http://localhost:8080/social")
                .queryParam("provider", provider)
                .queryParam("oauthId", oauthId)
                .build().toUriString();
        httpServletResponse.sendRedirect(uri);
    }
}