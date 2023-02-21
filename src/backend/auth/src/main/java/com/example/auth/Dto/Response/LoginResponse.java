package com.example.auth.Dto.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class LoginResponse {

    private String grantType;
    private String accessToken;
    private String refreshToken;
    private String username;
}
