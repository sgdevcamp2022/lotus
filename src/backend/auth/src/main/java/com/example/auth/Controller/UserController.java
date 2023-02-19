package com.example.auth.Controller;

import com.example.auth.Dto.Request.MainCharacterRequest;
import com.example.auth.Dto.Request.NicknameRequest;
import com.example.auth.Dto.Request.PasswordRequest;
import com.example.auth.Dto.Request.SignupRequest;
import com.example.auth.Dto.Response.DefaultResponse;
import com.example.auth.Dto.Response.ResponseMessage;
import com.example.auth.Dto.Response.SignupResponse;
import com.example.auth.Dto.Response.StatusCode;
import com.example.auth.Entity.User;
import com.example.auth.Jwt.TokenProvider;
import com.example.auth.Lostark.LostarkAuthentication;
import com.example.auth.Service.FriendService;
import com.example.auth.Service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.v3.oas.annotations.Operation;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.web.servlet.function.EntityResponse;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    private final TokenProvider tokenProvider;
    private final FriendService friendService;
    private final LostarkAuthentication lostarkAuthentication;


    public UserController(UserService userService, TokenProvider tokenProvider,
            FriendService friendService, LostarkAuthentication lostarkAuthentication) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.friendService = friendService;
        this.lostarkAuthentication=lostarkAuthentication;
    }



    @PostMapping("/signup")
    public ResponseEntity<DefaultResponse<SignupRequest>> signup(
            @Valid @RequestBody SignupRequest signupRequest
    ) {

        DefaultResponse signupResponse = userService.signup(signupRequest);
        SignupResponse data =(SignupResponse)signupResponse.getData();
        if(signupResponse.getCode()==400){
            return new ResponseEntity<>(signupResponse, HttpStatus.BAD_REQUEST);
        }
        String email = data.getEmail();
        Optional<User> userByEmail = userService.getUserByEmail(email);
        friendService.createFriendList(userByEmail.get().getUserId());
        ResponseEntity.ok().body(signupResponse);




        return new ResponseEntity<>(signupResponse, HttpStatus.OK);
    }



//    @PostMapping("/update/maincharacter")
//    public ResponseEntity<DefaultResponse> updateMainCharacter(@RequestHeader String authorization) {
//        String accessToken = authorization.substring(7);
//        Long userIdFromAccessToken = tokenProvider.getUserIdFromAccessToken(accessToken);
//        Optional<User> userByUserId = userService.getUserByUserId(userIdFromAccessToken);
//        JsonNode characterInfo = lostarkAuthentication.getCharacterInfo(
//                userByUserId.get().getCharacter_name());
//
//        System.out.println("characterInfo = " + characterInfo);
//
//        DefaultResponse defaultResponse = new DefaultResponse(StatusCode.OK,
//                ResponseMessage.LOSTARK_MAINCHARACTER_LOAD_SUCCESS, characterInfo);
//        ResponseEntity.ok().body(defaultResponse);
//        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
//
//    }

    @PostMapping("/update/maincharacter")
    @Operation(description = "response data null로 반환됨")
    public ResponseEntity<DefaultResponse> updateMainCharacter(@Valid @RequestBody
    MainCharacterRequest mainCharacterRequest,
            @RequestHeader String authorization){
        String accessToken = authorization.substring(7);
        String profileImageInLostark = lostarkAuthentication.getProfileImageInLostark(
                mainCharacterRequest.getCharacterName());

        System.out.println("profileImageInLostark = " + profileImageInLostark);
        if(profileImageInLostark!=null && !profileImageInLostark.isEmpty() && profileImageInLostark.equals("사용자 존재x")){
            DefaultResponse defaultResponse=new DefaultResponse(StatusCode.BAD_REQUEST,ResponseMessage.LOSTARK_MAINCHARACTER_SUCCESS,null);
            return new ResponseEntity<>(defaultResponse,HttpStatus.BAD_REQUEST);
        }


        DefaultResponse defaultResponse = userService.updateMainCharacter(
                mainCharacterRequest.getCharacterName(),
                profileImageInLostark,
                accessToken);
        ResponseEntity.ok().body(defaultResponse);
        if(defaultResponse.getCode()==StatusCode.USER_NONEXISTENCE){
            return new ResponseEntity<>(defaultResponse, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(defaultResponse,HttpStatus.OK);

    }

    @PostMapping("/load/maincharacter")
    @Operation(description = "response data 예시  {\n"
            + "    \"ServerName\": \"니나브\",\n"
            + "    \"CharacterName\": \"조안녕hi\",\n"
            + "    \"CharacterLevel\": 45,\n"
            + "    \"CharacterClassName\": \"바드\",\n"
            + "    \"ItemAvgLevel\": \"209.17\",\n"
            + "    \"ItemMaxLevel\": \"209.17\"\n"
            + "  }")
    public ResponseEntity<DefaultResponse> loadMainCharacter(@RequestHeader String authorization) {
        String accessToken = authorization.substring(7);
        Long userIdFromAccessToken = tokenProvider.getUserIdFromAccessToken(accessToken);
        Optional<User> userByUserId = userService.getUserByUserId(userIdFromAccessToken);
        JsonNode characterInfo = lostarkAuthentication.getCharacterInfo(
                userByUserId.get().getCharacter_name());

        System.out.println("characterInfo = " + characterInfo);

        DefaultResponse defaultResponse = new DefaultResponse(StatusCode.OK,
                ResponseMessage.LOSTARK_MAINCHARACTER_LOAD_SUCCESS, characterInfo);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);

    }


    @PostMapping("/update/nickname")
    @Operation(description = "response data null로 반환됨")
    public ResponseEntity<DefaultResponse> updateMainCharacter(@Valid @RequestBody NicknameRequest nicknameRequest,
            @RequestHeader String authorization){
        String accessToken = authorization.substring(7);
        DefaultResponse defaultResponse = userService.updateNickname(nicknameRequest.getNickname(),
                accessToken);
        ResponseEntity.ok().body(defaultResponse);
        if(defaultResponse.getCode()==StatusCode.USER_NONEXISTENCE){
            return new ResponseEntity<>(defaultResponse, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(defaultResponse,HttpStatus.OK);

    }

    @PostMapping("/update/password")
    @Operation(description = "response data null로 반환됨")
    public ResponseEntity<DefaultResponse> updatePassword(@Valid @RequestBody PasswordRequest passwordRequest,
            @RequestHeader String authorization){
        String accessToken = authorization.substring(7);
        DefaultResponse defaultResponse = userService.updatePassword(passwordRequest.getPassword(),
                accessToken);
        ResponseEntity.ok().body(defaultResponse);
        if(defaultResponse.getCode()==StatusCode.USER_NONEXISTENCE){
            return new ResponseEntity<>(defaultResponse, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(defaultResponse,HttpStatus.OK);

    }

    @PostMapping("/delete")
    @Operation(description = "response data null로 반환됨")
    public ResponseEntity<DefaultResponse> deleteUser(@RequestHeader String authorization){
        String accessToken = authorization.substring(7);
        userService.deleteUser(accessToken);
        DefaultResponse defaultResponse=new DefaultResponse(StatusCode.OK,ResponseMessage.DELETE_USER_SUCCESS,null);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse,HttpStatus.OK);

    }







    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<SignupRequest> getMyUserInfo(HttpServletRequest request) {
        return ResponseEntity.ok(userService.getMyUserWithAuthorities());
    }


    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<SignupRequest> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(username));
    }


}
