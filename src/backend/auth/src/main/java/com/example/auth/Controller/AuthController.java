package com.example.auth.Controller;

import com.example.auth.Dto.LoginDto;
import com.example.auth.Dto.StoveDto;
import com.example.auth.Entity.User;
import com.example.auth.Lostark.LostarkAuthentication;
import com.example.auth.Lostark.WebDriverUtil;
import com.example.auth.Security.JwtFilter;
import com.example.auth.Service.UserService;
import com.example.auth.Vo.DefaultResponse;
import com.example.auth.Vo.ResponseMessage;
import com.example.auth.Vo.StatusCode;
import com.example.auth.Vo.StoveInfo;
import com.example.auth.Vo.TokenInfo;
import com.example.auth.Security.TokenProvider;
import com.example.auth.Service.AuthService;
import com.example.auth.Util.SecurityUtil;
import com.fasterxml.jackson.databind.JsonNode;
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
    public DefaultResponse<TokenInfo> authorize(@Valid @RequestBody LoginDto loginDto) {
        TokenInfo jwt = authService.login(loginDto);
        // authService.saveRedis(jwt.getRefreshToken(), jwt.getUsername());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        Optional<String> currentUsername = SecurityUtil.getCurrentUsername();
        System.out.println("currentUsername = " + currentUsername);

        return new DefaultResponse<>(StatusCode.OK,ResponseMessage.LOGIN_SUCCESS,jwt);

    }

    @PostMapping("/logout")
    public DefaultResponse<Object> logout(@RequestHeader("Authorization") String authorization,
            @RequestHeader("RefreshToken") String refreshToken){

        String accessToken = authorization.substring(7);
        Long userIdFromAccessToken = tokenProvider.getUserIdFromAccessToken(accessToken);
        authService.logout(accessToken, refreshToken,userIdFromAccessToken);

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
////        HttpHeaders httpHeaders = new HttpHeaders();
////        return new ResponseEntity<>(response, httpHeaders, HttpStatus.OK);
//    }


    @PostMapping("/validate")
    public boolean validateAccessToken(@RequestHeader String authorization) {
        String accessToken = authorization.substring(7);
        return tokenProvider.validateToken(accessToken);
    }

    @GetMapping("/my")
    public Optional<User> getUserFromJwt(@RequestHeader String authorization) {
        String accessToken = authorization.substring(7);
        Long userId = tokenProvider.getUserIdFromAccessToken(accessToken);
        Object principal = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("principal = " + principal);
        Optional<User> userByUsername = userService.getUserByUserId(userId);
        return userByUsername;
    }

//    @GetMapping("/stove")
//    public ResponseEntity<StoveInfo> lostark(@Valid @RequestBody StoveDto stoveDto) {
//        WebDriverUtil webDriverUtil = new WebDriverUtil();
//        String introductionInStove = webDriverUtil.getIntroductionInStove(stoveDto.getStoveUrl());
//        HttpHeaders httpHeaders=new HttpHeaders();
//        StoveInfo stoveInfo=new StoveInfo(stoveDto.getStoveUrl(), stoveDto.getRandomCode(), false);
//        if(introductionInStove.equals(stoveDto.getRandomCode())){   //소개글과 랜덤코드가 일치하면
//            stoveInfo.setResult(true);
//            return new ResponseEntity<>(stoveInfo, httpHeaders, HttpStatus.OK);
//        }
//        else{
//            return new ResponseEntity<>(stoveInfo, httpHeaders, HttpStatus.OK);
//        }
//    }

    @PostMapping("/stove")
    public DefaultResponse<JsonNode> lostark(@Valid @RequestBody StoveDto stoveDto) {
        WebDriverUtil webDriverUtil = new WebDriverUtil();
        DefaultResponse introductionInStove = webDriverUtil.getIntroductionInStove(
                stoveDto.getStoveUrl());
        switch(introductionInStove.getCode()){
            case StatusCode.URL_ERROR:{
                //return introductionInStove;
            }
        }
        System.out.println("introductionInStove = " + introductionInStove);

        HttpHeaders httpHeaders=new HttpHeaders();
        StoveInfo stoveInfo =(StoveInfo) introductionInStove.getObject();


        if(stoveInfo.getRandomCode().equals(stoveDto.getRandomCode())){   //소개글과 랜덤코드가 일치하면

            String encryptedMemberNo = lostarkAuthentication.getEncryptedMemberNo(
                    stoveInfo.getMemberNo());
            System.out.println("encryptedMemberNo = " + encryptedMemberNo);
            String battleInfoRoomUrl="https://lostark.game.onstove.com//Profile/Member?id="+encryptedMemberNo;

            WebDriverUtil webDriverUtil2 = new WebDriverUtil();
            String characterName = webDriverUtil2.getCharacterInLostark(battleInfoRoomUrl);

            JsonNode charactersInLostark = lostarkAuthentication.getCharactersInLostark(characterName);
            DefaultResponse<JsonNode> jsonNodeDefaultResponse = new DefaultResponse<>();
            jsonNodeDefaultResponse.setObject(charactersInLostark);
            jsonNodeDefaultResponse.setCode(StatusCode.OK);
            jsonNodeDefaultResponse.setMessage(ResponseMessage.STOVE_LOSTARK_SUCCESS);

            return jsonNodeDefaultResponse;
        }
        else{
            DefaultResponse<JsonNode> jsonNodeDefaultResponse = new DefaultResponse<>();
            jsonNodeDefaultResponse.setCode(StatusCode.BAD_REQUEST);
            jsonNodeDefaultResponse.setMessage(ResponseMessage.BAD_REQUEST);
            return jsonNodeDefaultResponse;
        }
    }

//    @GetMapping("/lostark")
//    public DefaultResponse<JsonNode>  getLostark(@Valid @RequestBody StoveDto stoveDto){
//        String encryptedMemberNo = lostarkAuthentication.getEncryptedMemberNo("83742739");
//        System.out.println("encryptedMemberNo = " + encryptedMemberNo);
//        String battleInfoRoomUrl="https://lostark.game.onstove.com//Profile/Member?id="+encryptedMemberNo;
//
//        WebDriverUtil webDriverUtil2 = new WebDriverUtil();
//        String characterName = webDriverUtil2.getCharacterInLostark(battleInfoRoomUrl);
//
//        JsonNode charactersInLostark = lostarkAuthentication.getCharactersInLostark(characterName);
//        DefaultResponse<JsonNode> jsonNodeDefaultResponse = new DefaultResponse<>();
//        jsonNodeDefaultResponse.setObject(charactersInLostark);
//        jsonNodeDefaultResponse.setCode(StatusCode.OK);
//        jsonNodeDefaultResponse.setMessage(ResponseMessage.STOVE_LOSTARK_SUCCESS);
//
//        return jsonNodeDefaultResponse;
//    }


//    @GetMapping("/lostark")
//    public JsonNode getLostark(@Valid @RequestBody StoveDto stoveDto){
//        String encryptedMemberNo = lostarkAuthentication.getEncryptedMemberNo(
//                stoveDto.getStoveUrl());
//        System.out.println("encryptedMemberNo = " + encryptedMemberNo);
//        String battleInfoRoomUrl="https://lostark.game.onstove.com//Profile/Member?id="+encryptedMemberNo;
//        WebDriverUtil webDriverUtil = new WebDriverUtil();
//        String characterName = webDriverUtil.getCharacterInLostark(battleInfoRoomUrl);
//       // String lostarkOpenApiUrl="https://developer-lostark.game.onstove.com/characters/"+characterName+"/siblings";
//        JsonNode charactersInLostark = lostarkAuthentication.getCharactersInLostark(characterName);
//        return charactersInLostark;
//    }


    @GetMapping("/randomcode")
    public ResponseEntity<String> getRandomCode() {
        HttpHeaders httpHeaders = new HttpHeaders();

        String randomCode = lostarkAuthentication.generateRandomCode();
        System.out.println("randomCode = " + randomCode);
        return new ResponseEntity<>(randomCode, httpHeaders, HttpStatus.OK);
    }


}

