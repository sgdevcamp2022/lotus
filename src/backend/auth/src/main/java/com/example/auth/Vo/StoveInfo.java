package com.example.auth.Vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class StoveInfo {
    private String stoveUrl;
    private String randomCode;
    private boolean result;
}
