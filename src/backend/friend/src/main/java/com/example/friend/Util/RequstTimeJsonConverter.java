package com.example.friend.Util;

import com.example.friend.Entity.RequestTime;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.persistence.AttributeConverter;

public class RequstTimeJsonConverter implements AttributeConverter<RequestTime, String> {
    private final ObjectMapper objectMapper=new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(RequestTime requestTime) {
        //Information 객체 -> Json 문자열로 변환
        try {
            return objectMapper.writeValueAsString(requestTime);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public RequestTime convertToEntityAttribute(String jsonString) {
        //Json 문자열 Information 객체로 변환
        try {
            return objectMapper.readValue(jsonString, RequestTime.class);
        } catch (Exception e) {
            return null;
        }
    }
}
