package com.example.auth.Service;

import com.example.auth.Dto.Request.SignupRequest;

import com.example.auth.Entity.User;
import com.example.auth.Oauth2.Provider;
import com.example.auth.Repository.UserRepository;
import com.example.auth.Jwt.TokenProvider;
import com.example.auth.Util.SecurityUtil;
import com.example.auth.Dto.Response.DefaultResponse;
import com.example.auth.Dto.Response.ResponseMessage;
import com.example.auth.Dto.Response.StatusCode;
import com.example.auth.Exception.DuplicateMemberException;
import com.example.auth.Exception.NotFoundMemberException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;


    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            AuthenticationManagerBuilder authenticationManagerBuilder,
            TokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.tokenProvider = tokenProvider;
    }


    @Transactional
    public SignupRequest signup(SignupRequest signupRequest) {
        //  if (userRepository.findOneWithAuthoritiesByUsername(userDto.getUsername()).orElse(null) != null) {
        if (userRepository.findOneByEmail(signupRequest.getEmail()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

        User user = User.builder()
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .nickname(signupRequest.getNickname())
                .profile_image(signupRequest.getProfile_image())
                .auth("ROLE_USER")
                .activated(true)
                .provider(Provider.LOCAL.toString())
                .build();

        System.out.println(user.getPassword());

        return SignupRequest.from(userRepository.save(user));
    }


    @Transactional(readOnly = true)
    public Optional<User> getUserByUsername(String email) {

        Optional<User> oneByUsername = userRepository.findOneByEmail(email);
        return oneByUsername;
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserByUserId(Long userId) {

        Optional<User> oneByUserId = userRepository.findOneByUserId(userId);
        return oneByUserId;
    }

    @Transactional(readOnly = true)
    public SignupRequest getUserWithAuthorities(String email) {
        return SignupRequest.from(userRepository.findOneWithAuthoritiesByEmail(email).orElse(null));
    }


    @Transactional(readOnly = true)
    public SignupRequest getMyUserWithAuthorities() {
        return SignupRequest.from(
                SecurityUtil.getCurrentUsername()
                        .flatMap(userRepository::findOneByEmail)
                        .orElseThrow(() -> new NotFoundMemberException("Member not found"))
        );
    }

    @Transactional
    public DefaultResponse updateStoveNo(Long userId, String stoveNo) {
        Optional<User> oneByUserId = userRepository.findOneByUserId(userId);
        if (oneByUserId.isEmpty()) {
            return new DefaultResponse(StatusCode.STOVENO_ERROR,
                    ResponseMessage.STOVE_NUMBER_FAILURE, null);
        } else {
            User user = oneByUserId.get();
            user.setStove_no(stoveNo);
            userRepository.save(user);
            return new DefaultResponse(StatusCode.OK, ResponseMessage.STOVE_NUMBER_SUCCESS, null);
        }
    }


}
