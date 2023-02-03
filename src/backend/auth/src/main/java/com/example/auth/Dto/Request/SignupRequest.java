package com.example.auth.Dto.Request;


import com.example.auth.Entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import lombok.*;

import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {

    @NotNull
    @Size(min = 3, max = 50)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Size(min = 3, max = 100)
    private String password;

    @NotNull
    @Size(min = 3, max = 50)
    private String nickname;

    //private Set<AuthorityDto> authorityDtoSet;

    private String auth;

    private String profile_image;

    public static SignupRequest from(User user) {
        if (user == null) {
            return null;
        }

        return SignupRequest.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                /*  .authorityDtoSet(user.getAuthorities().stream()
                          .map(authority -> AuthorityDto.builder().authorityName(authority.getAuthorityName()).build())
                          .collect(Collectors.toSet()))*/
                .auth(user.getAuth())
                .profile_image(user.getProfile_image())
                .build();
    }
}