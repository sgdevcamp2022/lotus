package com.example.auth.Controller;

import com.example.auth.Dto.LoginDto;
import com.example.auth.Dto.StoveDto;
import com.example.auth.Entity.User;
import com.example.auth.Lostark.LostarkAuthentication;
import com.example.auth.Lostark.WebDriverUtil;
import com.example.auth.Security.JwtFilter;
import com.example.auth.Service.UserService;
import com.example.auth.Vo.TokenInfo;
import com.example.auth.Security.TokenProvider;
import com.example.auth.Service.AuthService;
import com.example.auth.Util.SecurityUtil;
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
    private final LostarkAuthentication lostarkAuthentication;


    public AuthController(TokenProvider tokenProvider,
            AuthenticationManagerBuilder authenticationManagerBuilder,
            AuthService authService, UserService userService,
            LostarkAuthentication lostarkAuthentication) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.authService = authService;
        this.userService = userService;
        this.lostarkAuthentication = lostarkAuthentication;
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

//    @PostMapping("/reissue")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
//    public ResponseEntity<DefaultResponse> reissueAccessToken(@RequestHeader HttpHeaders headers) {
//        HttpHeaders httpHeaders = new HttpHeaders();
//        DefaultResponse response = authService.reissueRefreshToken(
//                headers.getFirst("refreshtoken"));
//        return new ResponseEntity<>(response, httpHeaders, HttpStatus.OK);
//    }


    @PostMapping("/validate")
    public boolean validateAccessToken(@RequestHeader String authorization) {
        String accessToken = authorization.substring(7);
        return tokenProvider.validateToken(accessToken);
    }

    @GetMapping("/my")
    public Optional<User> getUserFromJwt(@RequestHeader String authorization) {
        String accessToken = authorization.substring(7);
        String userId = tokenProvider.getUserIdFromAccessToken(accessToken);
        Optional<User> userByUsername = userService.getUserByUserId(Long.parseLong(userId));
        return userByUsername;
    }

    @GetMapping("/stove")
    public ResponseEntity<Boolean> lostark(@Valid @RequestBody StoveDto stoveDto) {
        WebDriverUtil webDriverUtil = new WebDriverUtil();
        String introductionInStove = webDriverUtil.useDriver(stoveDto.getStoveUrl());
        HttpHeaders httpHeaders=new HttpHeaders();
        if(introductionInStove.equals(stoveDto.getRandomCode())){
            return new ResponseEntity<>(true, httpHeaders, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(false, httpHeaders, HttpStatus.OK);
        }

//        WebDriverUtil webDriverUtil=new WebDriverUtil();
//        webDriverUtil.useDriver("https://timeline.onstove.com/83742733");
    }



    @GetMapping("/randomcode")
    public ResponseEntity<String> getRandomCode(@RequestHeader String authorization) {
        String accessToken = authorization.substring(7);
        HttpHeaders httpHeaders = new HttpHeaders();

        String randomCode = lostarkAuthentication.generateRandomCode(accessToken);
        System.out.println("randomCode = " + randomCode);
        return new ResponseEntity<>(randomCode, httpHeaders, HttpStatus.OK);
    }


}

