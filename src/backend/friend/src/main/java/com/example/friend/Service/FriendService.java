package com.example.friend.Service;


import com.example.friend.Dto.Request.RequestFriend;
import com.example.friend.Dto.Response.DefaultResponse;
import com.example.friend.Dto.Response.ResponseMessage;
import com.example.friend.Dto.Response.StatusCode;
import com.example.friend.Entity.Friend;

import com.example.friend.Repository.FriendRepository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FriendService {
    private final FriendRepository friendRepository;


    public FriendService(FriendRepository friendRepository) {
        this.friendRepository = friendRepository;
    }


    @Transactional
    public DefaultResponse saveRequest(RequestFriend requestFriend) {
        Date now = new Date();
//        SimpleDateFormat sdf1=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy년 MM월 dd일");
        String nowTime = sdf.format(now);

        Optional<Friend> oneByUserId = friendRepository.findOneByUserId(
                requestFriend.getFromUserId());

        JSONObject requestJsonObject = new JSONObject();
        requestJsonObject.put("id", requestFriend.getToUserId());
        JSONObject timeJsonObject = new JSONObject();
        timeJsonObject.put("time",nowTime);


        if(oneByUserId.isEmpty()){
            JSONArray jsonArray = new JSONArray();
            JSONArray jsonArray2 = new JSONArray();
            jsonArray.add(requestJsonObject);
            jsonArray2.add(timeJsonObject);
            Friend friend=Friend.builder()
                    .userId(requestFriend.getFromUserId())
                    .requestList(jsonArray.toJSONString())
                    .requestTime(jsonArray2.toJSONString())
                    .build();
            friendRepository.save(friend);
        }
        else{
            Friend friend = oneByUserId.get();
            String requestList = friend.getRequestList();
            String requestTime = friend.getRequestTime();
            JSONParser jsonParser = new JSONParser();
            try {
                JSONArray requestArray = (JSONArray)jsonParser.parse(requestList);
                JSONArray timeArray = (JSONArray)jsonParser.parse(requestTime);
                requestArray.add(requestJsonObject);
                timeArray.add(timeJsonObject);
                oneByUserId.get().setRequestList(requestArray.toJSONString());
                oneByUserId.get().setRequestTime(timeArray.toJSONString());
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }

return new DefaultResponse(StatusCode.OK, ResponseMessage.FRIEND_REQUEST_SUCCESS, null);

    }


}
