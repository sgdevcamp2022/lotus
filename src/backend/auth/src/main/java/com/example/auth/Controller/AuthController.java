package com.example.auth.Controller;

import com.example.auth.Dto.Request.LoginRequest;
import com.example.auth.Dto.Request.StoveRequest;
import com.example.auth.Dto.Response.MyResponse;
import com.example.auth.Entity.User;
import com.example.auth.Lostark.HttpSourceCall;
import com.example.auth.Lostark.LostarkAuthentication;
import com.example.auth.Lostark.WebDriverUtil;
import com.example.auth.Jwt.JwtFilter;
import com.example.auth.Service.UserService;
import com.example.auth.Dto.Response.DefaultResponse;
import com.example.auth.Dto.Response.ResponseMessage;
import com.example.auth.Dto.Response.StatusCode;
import com.example.auth.Dto.Response.StoveResponse;
import com.example.auth.Dto.Response.LoginResponse;
import com.example.auth.Jwt.TokenProvider;
import com.example.auth.Service.AuthService;
import com.example.auth.Util.SecurityUtil;
import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import org.springframework.security.access.prepost.PreAuthorize;
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
            AuthenticationManagerBuilder authenticationManagerBuilder, AuthService authService,
            UserService userService, LostarkAuthentication lostarkAuthentication) {
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

        return new DefaultResponse<>(StatusCode.OK, ResponseMessage.LOGIN_SUCCESS, jwt);
    }

    @GetMapping("/logout")
    @Operation(description = "response data null로 반환됨")
    public DefaultResponse<Object> logout(@RequestHeader("Authorization") String authorization) {

        String accessToken = authorization.substring(7);
        Long userIdFromAccessToken = tokenProvider.getUserIdFromAccessToken(accessToken);
        authService.logout(accessToken, "refreshToken", userIdFromAccessToken);

        return new DefaultResponse(StatusCode.OK, ResponseMessage.LOGOUT_SUCCESSS, null);
    }

    @PostMapping("/reissue")
    @Operation(description = "헤더에 accesstoken과 refreshtoken담아야함")
    public ResponseEntity<DefaultResponse> reissueAccessToken(@RequestHeader HttpHeaders headers) {
        String accessToken = headers.getFirst("authorization").substring(7);
        System.out.println("accessToken = " + accessToken);
        String refreshToken = headers.getFirst("refreshtoken");
        System.out.println("refreshToken = " + refreshToken);
        DefaultResponse defaultResponse = authService.reissueAccessToken(accessToken, refreshToken);
        HttpHeaders httpHeaders = new HttpHeaders();
        if (defaultResponse.getCode() == 309) {
            // httpHeaders.setLocation(URI.create("http://localhost:3090/login"));
            return new ResponseEntity<>(defaultResponse, httpHeaders,
                    HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(defaultResponse, httpHeaders,
                HttpStatus.OK);
    }


    @GetMapping("/my")
    public ResponseEntity<DefaultResponse<MyResponse>> getUserFromJwt(@RequestHeader String authorization) {

        String accessToken = authorization.substring(7);
        Long userId = tokenProvider.getUserIdFromAccessToken(accessToken);
        Object principal = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("principal = " + principal);
        Optional<User> userByUsername = userService.getUserByUserId(userId);

        if (userByUsername.isEmpty()) {
            DefaultResponse defaultResponse1 = DefaultResponse.builder().data(null)
                    .code(StatusCode.NOT_FOUND).message(ResponseMessage.READ_USER_FAILURE).build();
        }
//        MyResponse myResponse = new MyResponse(userByUsername.get().getUserId(),
//                userByUsername.get().getEmail(),
//                userByUsername.get().getNickname(), userByUsername.get().getAuth(),
//                userByUsername.get().getProvider(), userByUsername.get().getStove_no());
        MyResponse myResponse= MyResponse.builder()
                .userId(userByUsername.get().getUserId())
                .profileImage(userByUsername.get().getProfile_image())
                .stoveNo(userByUsername.get().getStove_no())
                .auth(userByUsername.get().getAuth())
                .nickname(userByUsername.get().getNickname())
                .characterName(userByUsername.get().getCharacter_name())
                .email(userByUsername.get().getEmail())
                .build();
        DefaultResponse<MyResponse> defaultresponse = new DefaultResponse<>(StatusCode.OK,
                ResponseMessage.READ_USER_SUCCESS, myResponse);
        ResponseEntity.ok().body(defaultresponse);
        return new ResponseEntity<>(defaultresponse, HttpStatus.OK);
    }

//    @PostMapping("/stove")
//    public ResponseEntity<DefaultResponse> lostark(@Valid @RequestBody StoveRequest stoveDto,
//            @RequestHeader String authorization) {
//        String accessToken = authorization.substring(7);
//        Long userId = tokenProvider.getUserIdFromAccessToken(accessToken);
//        HttpHeaders httpHeaders = new HttpHeaders();
//
//        WebDriverUtil webDriverUtil = new WebDriverUtil();
//        DefaultResponse introductionInStove = webDriverUtil.getIntroductionInStove(
//                stoveDto.getStoveUrl());
//        switch (introductionInStove.getCode()) {
//
//            case StatusCode.URL_ERROR: {
//                System.out.println("check1");
//                return new ResponseEntity<>(introductionInStove, httpHeaders,
//                        StatusCode.STOVENO_ERROR);
//            }
//        }
//        System.out.println("introductionInStove = " + introductionInStove);
//
//        StoveResponse stoveResponse = (StoveResponse) introductionInStove.getData();
//        System.out.println("check1");
//
//        if (stoveResponse.getRandomCode().equals(stoveDto.getRandomCode())) {   //소개글과 랜덤코드가 일치하면
//            System.out.println("check2");
//            userService.updateStoveNo(userId, stoveResponse.getMemberNo());     //회원테이블에 stoveno추가
//
//            String encryptedMemberNo = lostarkAuthentication.getEncryptedMemberNo(
//                    stoveResponse.getMemberNo());
//            System.out.println("encryptedMemberNo = " + encryptedMemberNo);
//            String battleInfoRoomUrl =
//                    "https://lostark.game.onstove.com//Profile/Member?id=" + encryptedMemberNo;
//
//            WebDriverUtil webDriverUtil2 = new WebDriverUtil();
//            String characterName = webDriverUtil2.getCharacterInLostark(battleInfoRoomUrl);
//            System.out.println("characterName = " + characterName);
//
//            JsonNode charactersInLostark = lostarkAuthentication.getCharactersInLostark(
//                    characterName);
//            DefaultResponse<JsonNode> jsonNodeDefaultResponse = new DefaultResponse<>();
//            jsonNodeDefaultResponse.setData(charactersInLostark);
//            jsonNodeDefaultResponse.setCode(StatusCode.OK);
//            jsonNodeDefaultResponse.setMessage(ResponseMessage.STOVE_LOSTARK_SUCCESS);
//
//            return new ResponseEntity<>(jsonNodeDefaultResponse, httpHeaders, HttpStatus.OK);
//        } else {
//            DefaultResponse<JsonNode> jsonNodeDefaultResponse = new DefaultResponse<>();
//            jsonNodeDefaultResponse.setCode(StatusCode.BAD_REQUEST);
//            jsonNodeDefaultResponse.setMessage(ResponseMessage.BAD_REQUEST);
//            return new ResponseEntity<>(jsonNodeDefaultResponse, httpHeaders,
//                    HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//
//    }

    @PostMapping("/stove")
    @Operation(description = "response data 예시  {\n"
            + "    \"ServerName\": \"니나브\",\n"
            + "    \"CharacterName\": \"조안녕hi\",\n"
            + "    \"CharacterLevel\": 45,\n"
            + "    \"CharacterClassName\": \"바드\",\n"
            + "    \"ItemAvgLevel\": \"209.17\",\n"
            + "    \"ItemMaxLevel\": \"209.17\"\n"
            + "  }")
    public ResponseEntity<DefaultResponse> lostark(@Valid @RequestBody StoveRequest stoveRequest,
            @RequestHeader String authorization) {
        String accessToken = authorization.substring(7);
        Long userId = tokenProvider.getUserIdFromAccessToken(accessToken);
        HttpHeaders httpHeaders = new HttpHeaders();
        DefaultResponse introductionInStove = lostarkAuthentication.getIntroductionInStove(
                stoveRequest);

        switch (introductionInStove.getCode()) {
            case StatusCode.URL_ERROR: {
                DefaultResponse<JsonNode> jsonNodeDefaultResponse = new DefaultResponse<>();
                jsonNodeDefaultResponse.setCode(StatusCode.BAD_REQUEST);
                jsonNodeDefaultResponse.setMessage(ResponseMessage.BAD_REQUEST);
                return new ResponseEntity<>(jsonNodeDefaultResponse, httpHeaders,
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }



        String encryptedMemberNo = lostarkAuthentication.getEncryptedMemberNo(
                introductionInStove.getData().toString());

        String urlPath = "https://lostark.game.onstove.com//Profile/Member?id=" + encryptedMemberNo;
        JsonNode charactersInLostark = lostarkAuthentication.getCharactersInLostark(urlPath);
        DefaultResponse<JsonNode> jsonNodeDefaultResponse = new DefaultResponse<>();
        jsonNodeDefaultResponse.setData(charactersInLostark);
        jsonNodeDefaultResponse.setCode(StatusCode.OK);
        jsonNodeDefaultResponse.setMessage(ResponseMessage.STOVE_LOSTARK_SUCCESS);

        userService.updateStoveNo(userId, introductionInStove.getData().toString());
        return new ResponseEntity<>(jsonNodeDefaultResponse, httpHeaders, HttpStatus.OK);


    }


    @GetMapping("/randomcode")
    public ResponseEntity<DefaultResponse> getRandomCode(@RequestHeader String authorization) {
        String accessToken = authorization.substring(7);
        Long userIdFromAccessToken = tokenProvider.getUserIdFromAccessToken(accessToken);
        Optional<User> userByUserId = userService.getUserByUserId(userIdFromAccessToken);

        HttpHeaders httpHeaders = new HttpHeaders();

        String randomCode = lostarkAuthentication.generateRandomCode(userByUserId.get());
        System.out.println("randomCode = " + randomCode);
        DefaultResponse<Object> defaultResponse = new DefaultResponse<>(StatusCode.OK,
                ResponseMessage.RANDOMCODE_SUCCESS, randomCode);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }


}

