package com.example.auth.Config;

import com.example.auth.Oauth2.CustomOAuth2AuthService;
import com.example.auth.Oauth2.CustomOidcUserService;
import com.example.auth.Oauth2.OAuth2AuthenticationFailureHandler;
import com.example.auth.Oauth2.OAuth2AuthenticationSuccessHandler;
import com.example.auth.Repository.AccessTokenRepository;
import com.example.auth.Jwt.*;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsUtils;

@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private static final String[] PERMIT_URL_ARRAY = {
            "/user/signup",
            "/auth/login",
            "/auth/reissue",
            "/sns/**",
            "/user/load/friend/maincharacter",
            "/login",
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**"
    };

    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final TokenProvider tokenProvider;
    private final CustomOAuth2AuthService customOAuth2AuthService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    private final CustomOidcUserService customOidcUserService;
    private final Corsconfig corsconfig;
    private final AccessTokenRepository accessTokenRepository;

    public SecurityConfig(JwtAccessDeniedHandler jwtAccessDeniedHandler,
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
            TokenProvider tokenProvider, CustomOAuth2AuthService customOAuth2AuthService,
            OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler,
            OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler,
            CustomOidcUserService customOidcUserService,
            Corsconfig corsconfig,
            AccessTokenRepository accessTokenRepository) {
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.tokenProvider = tokenProvider;
        this.customOAuth2AuthService = customOAuth2AuthService;
        this.oAuth2AuthenticationFailureHandler = oAuth2AuthenticationFailureHandler;
        this.oAuth2AuthenticationSuccessHandler = oAuth2AuthenticationSuccessHandler;
        this.customOidcUserService = customOidcUserService;
        this.corsconfig = corsconfig;
        this.accessTokenRepository = accessTokenRepository;
    }


    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http

                .cors().and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()

                .authorizeRequests()
               // .requestMatchers(request -> CorsUtils.isPreFlightRequest(request)).permitAll()
                .antMatchers(PERMIT_URL_ARRAY).permitAll()
                .antMatchers("/test").hasRole("USER")
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(customOAuth2AuthService)
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oAuth2AuthenticationFailureHandler)

                .and()
                .apply(new JwtSecurityConfig(tokenProvider, accessTokenRepository));

        return http.build();
    }


}


