package com.example.auth.Dto.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class MyResponse {

    private String email;
    private String nickname;
    private String auth;
    private String provider;
    private String stoveNo;
}
