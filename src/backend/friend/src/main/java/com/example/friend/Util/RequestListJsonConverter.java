package com.example.friend.Util;


import com.fasterxml.jackson.databind.ObjectMapper;
import javax.persistence.AttributeConverter;
import org.json.simple.JSONArray;

//public class RequestListJsonConverter implements AttributeConverter<RequestList, String> {
//    private final ObjectMapper objectMapper=new ObjectMapper();
//
//    @Override
//    public String convertToDatabaseColumn(RequestList requestList) {
//        //Information 객체 -> Json 문자열로 변환
//        try {
//            return objectMapper.writeValueAsString(requestList);
//        } catch (Exception e) {
//            return null;
//        }
//    }
//
//    @Override
//    public RequestList convertToEntityAttribute(String jsonString) {
//        //Json 문자열 Information 객체로 변환
//        try {
//            System.out.println("jsonString = " + jsonString);
//            return objectMapper.readValue(jsonString, RequestList.class);
//        } catch (Exception e) {
//            return null;
//        }
//    }
//}


//public class RequestListJsonConverter implements AttributeConverter<JSONArray, String> {
//    private final ObjectMapper objectMapper=new ObjectMapper();
//
//    @Override
//    public String convertToDatabaseColumn(JSONArray requestList) {
//        //Information 객체 -> Json 문자열로 변환
//        try {
//            System.out.println("requestList = " + requestList);
//            return requestList.toString();
//        } catch (Exception e) {
//            return null;
//        }
//    }
//
//    @Override
//    public JSONArray convertToEntityAttribute(String jsonString) {
//        JSONArray array=null;
//        //Json 문자열 Information 객체로 변환
//        try {
//            array=new JSONArray(jsonString);
//            return array;
//        } catch (Exception e) {
//            return null;
//        }
//    }
//}
