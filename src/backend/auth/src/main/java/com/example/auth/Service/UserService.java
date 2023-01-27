package com.example.auth.Service;

import com.example.auth.Dto.UserDto;

import com.example.auth.Entity.User;
import com.example.auth.Oauth2.OAuth2Attributes;
import com.example.auth.Oauth2.Provider;
import com.example.auth.Repository.UserRepository;
import com.example.auth.Security.TokenProvider;
import com.example.auth.Util.SecurityUtil;
import com.example.auth.exception.DuplicateMemberException;
import com.example.auth.exception.NotFoundMemberException;
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
    public UserDto signup(UserDto userDto) {
        //  if (userRepository.findOneWithAuthoritiesByUsername(userDto.getUsername()).orElse(null) != null) {
        if (userRepository.findOneByEmail(userDto.getEmail()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

        User user = User.builder()
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .profile_image(userDto.getProfile_image())
                .auth("ROLE_USER")
                .activated(true)
                .provider(Provider.LOCAL.toString())
                .build();

        System.out.println(user.getPassword());

        return UserDto.from(userRepository.save(user));
    }




    public Optional<User> getUserByUsername(String email) {

        Optional<User> oneByUsername = userRepository.findOneByEmail(email);
        return oneByUsername;
    }

    @Transactional(readOnly = true)
    public UserDto getUserWithAuthorities(String email) {
        return UserDto.from(userRepository.findOneWithAuthoritiesByEmail(email).orElse(null));
    }

    /*@Transactional(readOnly = true)
    public UserDto getMyUserWithAuthorities() {
        return UserDto.from(
                SecurityUtil.getCurrentUsername()
                        .flatMap(userRepository::findOneWithAuthoritiesByUsername)
                        .orElseThrow(() -> new NotFoundMemberException("Member not found"))
        );
    }*/

    @Transactional(readOnly = true)
    public UserDto getMyUserWithAuthorities() {
        return UserDto.from(
                SecurityUtil.getCurrentUsername()
                        .flatMap(userRepository::findOneByEmail)
                        .orElseThrow(() -> new NotFoundMemberException("Member not found"))
        );
    }


}
