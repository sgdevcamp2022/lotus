package com.example.auth.Dto;


import com.example.auth.Entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import lombok.*;

import javax.validation.constraints.Size;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    @NotNull
    @Size(min = 3, max = 50)
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Size(min = 3, max = 100)
    private String password;

    @NotNull
    @Size(min = 3, max = 50)
    private String nickname;

    //private Set<AuthorityDto> authorityDtoSet;

    private String auth;

    public static UserDto from(User user) {
        if (user == null) {
            return null;
        }

        return UserDto.builder()
                .username(user.getUsername())
                .nickname(user.getNickname())
                /*  .authorityDtoSet(user.getAuthorities().stream()
                          .map(authority -> AuthorityDto.builder().authorityName(authority.getAuthorityName()).build())
                          .collect(Collectors.toSet()))*/
                .auth(user.getAuth())
                .build();
    }
}