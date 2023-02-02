package com.example.auth.Security;

import com.example.auth.Repository.AccessTokenRepository;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtSecurityConfig extends
        SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final TokenProvider tokenProvider;
    private final AccessTokenRepository accessTokenRepository;


    public JwtSecurityConfig(TokenProvider tokenProvider,
            AccessTokenRepository accessTokenRepository) {
        this.tokenProvider = tokenProvider;
        this.accessTokenRepository = accessTokenRepository;
    }

    @Override
    public void configure(HttpSecurity http) {
        http.addFilterBefore(
                new JwtFilter(tokenProvider, accessTokenRepository),
                UsernamePasswordAuthenticationFilter.class
        );
    }
}