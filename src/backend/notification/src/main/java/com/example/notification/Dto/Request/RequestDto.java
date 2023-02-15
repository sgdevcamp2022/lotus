package com.example.notification.Dto.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class RequestDto {
    private String targetToken;
    private String title;
    private String body;
}
