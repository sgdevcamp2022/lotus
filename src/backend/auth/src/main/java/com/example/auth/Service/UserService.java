package com.example.auth.Service;

import com.example.auth.Dto.UserDto;

import com.example.auth.Entity.User;
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
        if (userRepository.findOneByUsername(userDto.getUsername()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

        User user = User.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .auth("ROLE_USER")
                .activated(true)
                .build();

        System.out.println(user.getPassword());

        return UserDto.from(userRepository.save(user));
    }


    public Optional<User> getUserByUsername(String username) {

        Optional<User> oneByUsername = userRepository.findOneByUsername(username);
        return oneByUsername;
    }

    @Transactional(readOnly = true)
    public UserDto getUserWithAuthorities(String username) {
        return UserDto.from(userRepository.findOneWithAuthoritiesByUsername(username).orElse(null));
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
                        .flatMap(userRepository::findOneByUsername)
                        .orElseThrow(() -> new NotFoundMemberException("Member not found"))
        );
    }


}
