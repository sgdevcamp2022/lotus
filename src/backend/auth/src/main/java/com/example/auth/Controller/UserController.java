package com.example.auth.Controller;

import com.example.auth.Dto.Request.SignupRequest;
import com.example.auth.Entity.User;
import com.example.auth.Security.TokenProvider;
import com.example.auth.Service.UserService;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    private final TokenProvider tokenProvider;

    public UserController(UserService userService, TokenProvider tokenProvider) {
        this.userService = userService;
        this.tokenProvider=tokenProvider;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello");
    }

    @PostMapping("/test-redirect")
    public void testRedirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/api/user");
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupRequest> signup(
            @Valid @RequestBody SignupRequest signupRequest
    ) {
        System.out.println("userDto = " + signupRequest.getPassword());
        return ResponseEntity.ok(userService.signup(signupRequest));
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

    @GetMapping("/userman")
    public User redisTest() {
        Optional<User> userByUserId = userService.getUserByUserId(1L);
        return userByUserId.get();
    }

    @PostMapping("/updateStove")
    public void updateStove(@RequestHeader String authorization) {

        String accessToken = authorization.substring(7);
        Long userId = tokenProvider.getUserIdFromAccessToken(accessToken);



        userService.updateStoveNo(userId,"14421423");
    }


}
