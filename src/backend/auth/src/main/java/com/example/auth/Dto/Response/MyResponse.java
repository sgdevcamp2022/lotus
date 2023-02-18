package com.example.auth.Dto.Response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Description;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyResponse {
    private Long userId;
    private String email;
    private String nickname;
    private String auth;
    private String stoveNo;
    private String characterName;
    private String profileImage;
}
