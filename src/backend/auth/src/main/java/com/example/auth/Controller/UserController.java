package com.example.auth.Controller;

import com.example.auth.Dto.Request.SignupRequest;
import com.example.auth.Dto.Response.DefaultResponse;
import com.example.auth.Dto.Response.ResponseMessage;
import com.example.auth.Dto.Response.SignupResponse;
import com.example.auth.Dto.Response.StatusCode;
import com.example.auth.Entity.User;
import com.example.auth.Security.TokenProvider;
import com.example.auth.Service.UserService;
import java.util.Optional;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    private final TokenProvider tokenProvider;

    public UserController(UserService userService, TokenProvider tokenProvider) {
        this.userService = userService;
        this.tokenProvider=tokenProvider;
    }
    @PostMapping("/signup")
    public ResponseEntity<DefaultResponse> signup(
            @Valid @RequestBody SignupRequest signupRequest
    ) {
        SignupResponse signupResponse=new SignupResponse(signupRequest.getEmail(),signupRequest.getNickname());
        DefaultResponse<SignupResponse> defaultresponse = new DefaultResponse<>(StatusCode.OK,
                ResponseMessage.LOGIN_SUCCESS,signupResponse);

        ResponseEntity.ok().body(defaultresponse);
        return new ResponseEntity<>(defaultresponse, HttpStatus.OK);
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
