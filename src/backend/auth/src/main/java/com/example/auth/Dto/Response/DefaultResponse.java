package com.example.auth.Dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DefaultResponse<T> {

    private int code;
    private String message;
    private T object;


}
