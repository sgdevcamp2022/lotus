package com.example.auth.Controller;

import com.example.auth.Dto.Request.LoginRequest;
import com.example.auth.Dto.Request.StoveRequest;
import com.example.auth.Dto.Request.SignupRequest;
import com.example.auth.Entity.User;
import com.example.auth.Lostark.LostarkAuthentication;
import com.example.auth.Lostark.WebDriverUtil;
import com.example.auth.Security.JwtFilter;
import com.example.auth.Service.UserService;
import com.example.auth.Dto.Response.DefaultResponse;
import com.example.auth.Dto.Response.ResponseMessage;
import com.example.auth.Dto.Response.StatusCode;
import com.example.auth.Dto.Response.StoveResponse;
import com.example.auth.Dto.Response.LoginResponse;
import com.example.auth.Security.TokenProvider;
import com.example.auth.Service.AuthService;
import com.example.auth.Util.SecurityUtil;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public DefaultResponse<LoginResponse> authorize(@Valid @RequestBody LoginRequest loginDto) {
        LoginResponse jwt = authService.login(loginDto);


        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        Optional<String> currentUsername = SecurityUtil.getCurrentUsername();
        System.out.println("currentUsername = " + currentUsername);

        return new DefaultResponse<>(StatusCode.BAD_REQUEST,ResponseMessage.LOGIN_SUCCESS,jwt);
    }

    @GetMapping("/logout")
    public DefaultResponse<Object> logout(@RequestHeader("Authorization") String authorization){

        String accessToken = authorization.substring(7);
        Long userIdFromAccessToken = tokenProvider.getUserIdFromAccessToken(accessToken);
        authService.logout(accessToken, "refreshToken",userIdFromAccessToken);

        return new DefaultResponse(StatusCode.OK,ResponseMessage.LOGOUT_SUCCESSS,null);
    }

    @PostMapping("/test")
    public void test(@RequestHeader("Authorization") String authorization){
        String accessToken = authorization.substring(7);
        authService.test(accessToken);
    }

//    @PostMapping("/reissue")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
//    public void reissueAccessToken(@RequestHeader HttpHeaders headers) {
//        String accessToken = headers.getFirst("authorization").substring(7);
//        System.out.println("accessToken = " + accessToken);
//        String refreshToken=headers.getFirst("refreshtoken");
//        System.out.println("refreshToken = " + refreshToken);
////        DefaultResponse response = authService.reissueAccessToken(
////                headers.getFirst("refreshtoken"));
//


    @GetMapping("/my")
    public User getUserFromJwt(@RequestHeader String authorization) {

        String accessToken = authorization.substring(7);
        Long userId = tokenProvider.getUserIdFromAccessToken(accessToken);
        Object principal = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("principal = " + principal);
        Optional<User> userByUsername = userService.getUserByUserId(userId);


        if(userByUsername.isEmpty()){

        }

        return userByUsername.get();
    }





    @PostMapping("/stove")
    public ResponseEntity<DefaultResponse> lostark(@Valid @RequestBody StoveRequest stoveDto,
            @RequestHeader String authorization) {
        String accessToken = authorization.substring(7);
        Long userId = tokenProvider.getUserIdFromAccessToken(accessToken);
        HttpHeaders httpHeaders = new HttpHeaders();

        WebDriverUtil webDriverUtil = new WebDriverUtil();
        DefaultResponse introductionInStove = webDriverUtil.getIntroductionInStove(
                stoveDto.getStoveUrl());
        switch (introductionInStove.getCode()) {

            case StatusCode.URL_ERROR: {
                System.out.println("check1");
                return new ResponseEntity<>(introductionInStove, httpHeaders,
                        StatusCode.STOVENO_ERROR);
            }
        }
        System.out.println("introductionInStove = " + introductionInStove);

        StoveResponse stoveResponse = (StoveResponse) introductionInStove.getData();
        System.out.println("check1");

        if (stoveResponse.getRandomCode().equals(stoveDto.getRandomCode())) {   //소개글과 랜덤코드가 일치하면
            System.out.println("check2");
            userService.updateStoveNo(userId, stoveResponse.getMemberNo());     //회원테이블에 stoveno추가

            String encryptedMemberNo = lostarkAuthentication.getEncryptedMemberNo(
                    stoveResponse.getMemberNo());
            System.out.println("encryptedMemberNo = " + encryptedMemberNo);
            String battleInfoRoomUrl =
                    "https://lostark.game.onstove.com//Profile/Member?id=" + encryptedMemberNo;

            WebDriverUtil webDriverUtil2 = new WebDriverUtil();
            String characterName = webDriverUtil2.getCharacterInLostark(battleInfoRoomUrl);
            System.out.println("characterName = " + characterName);

            JsonNode charactersInLostark = lostarkAuthentication.getCharactersInLostark(
                    characterName);
            DefaultResponse<JsonNode> jsonNodeDefaultResponse = new DefaultResponse<>();
            jsonNodeDefaultResponse.setData(charactersInLostark);
            jsonNodeDefaultResponse.setCode(StatusCode.OK);
            jsonNodeDefaultResponse.setMessage(ResponseMessage.STOVE_LOSTARK_SUCCESS);

            return new ResponseEntity<>(jsonNodeDefaultResponse, httpHeaders, HttpStatus.OK);
        } else {
            DefaultResponse<JsonNode> jsonNodeDefaultResponse = new DefaultResponse<>();
            jsonNodeDefaultResponse.setCode(StatusCode.BAD_REQUEST);
            jsonNodeDefaultResponse.setMessage(ResponseMessage.BAD_REQUEST);
            return new ResponseEntity<>(jsonNodeDefaultResponse, httpHeaders,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }





    @GetMapping("/randomcode")
    public ResponseEntity<DefaultResponse> getRandomCode() {
        HttpHeaders httpHeaders = new HttpHeaders();

        String randomCode = lostarkAuthentication.generateRandomCode();
        System.out.println("randomCode = " + randomCode);
        DefaultResponse<Object> defaultResponse = new DefaultResponse<>(StatusCode.OK, ResponseMessage.RANDOMCODE_SUCCESS,
                randomCode);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse,HttpStatus.OK);
    }





}

