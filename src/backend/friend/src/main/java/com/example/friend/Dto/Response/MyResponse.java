package com.example.friend.Dto.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class MyResponse {
    private Long userId;
    private String email;
    private String nickname;
    private String auth;
    private String provider;
    private String stoveNo;
}

