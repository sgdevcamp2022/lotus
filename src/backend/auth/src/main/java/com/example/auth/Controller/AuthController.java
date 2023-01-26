package com.example.auth.Controller;

import com.example.auth.Dto.LoginDto;
import com.example.auth.Entity.User;
import com.example.auth.Repository.UserRepository;
import com.example.auth.Security.JwtFilter;
import com.example.auth.Service.UserService;
import com.example.auth.Vo.DefaultResponse;
import com.example.auth.Vo.TokenInfo;
import com.example.auth.Security.TokenProvider;
import com.example.auth.Service.AuthService;
import com.example.auth.Util.SecurityUtil;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final AuthService authService;
    private final UserService userService;


    public AuthController(TokenProvider tokenProvider,
            AuthenticationManagerBuilder authenticationManagerBuilder,
            AuthService authService, UserService userService) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenInfo> authorize(@Valid @RequestBody LoginDto loginDto) {
        TokenInfo jwt = authService.login(loginDto);
        // authService.saveRedis(jwt.getRefreshToken(), jwt.getUsername());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        Optional<String> currentUsername = SecurityUtil.getCurrentUsername();
        System.out.println("currentUsername = " + currentUsername);

        return new ResponseEntity<>(jwt, httpHeaders, HttpStatus.OK);

    }

    @PostMapping("/reissue")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<DefaultResponse> reissueAccessToken(@RequestHeader HttpHeaders headers) {
        HttpHeaders httpHeaders = new HttpHeaders();
        DefaultResponse response = authService.reissueRefreshToken(
                headers.getFirst("refreshtoken"));
        return new ResponseEntity<>(response, httpHeaders, HttpStatus.OK);
    }


    @PostMapping("/validate")
    public boolean validateAccessToken(@RequestHeader String authorization) {
        String accessToken = authorization.substring(7);
        return tokenProvider.validateToken(accessToken);
    }

    @GetMapping("/my")
    public Optional<User> getUserFromJwt(@RequestHeader String authorization) {
        String accessToken = authorization.substring(7);
        String username = authService.getUsernameFromAccessToken(accessToken);
        Optional<User> userByUsername = userService.getUserByUsername(username);
        return userByUsername;
    }


}

