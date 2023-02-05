package com.example.friend.Service;


import com.example.friend.Dto.Request.RequestFriend;
import com.example.friend.Dto.Response.DefaultResponse;
import com.example.friend.Dto.Response.ResponseMessage;
import com.example.friend.Dto.Response.StatusCode;
import com.example.friend.Entity.Friend;
import com.example.friend.Entity.RequestList;
import com.example.friend.Repository.FriendRepository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
        System.out.println("requestFriend.getFromUserId() = " + requestFriend.getFromUserId());

        Optional<Friend> oneByUserId = friendRepository.findOneByUserId(
                requestFriend.getFromUserId());
        if(oneByUserId.isEmpty()){
            org.json.simple.JSONArray jsonArray=new org.json.simple.JSONArray();
            for(int i=1; i<=5; i++){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", i);
                jsonArray.add(jsonObject);
            }


            Friend friend=Friend.builder()
                    .userId(requestFriend.getFromUserId())
                    .requestList(jsonArray.toJSONString())
                    .build();
            friendRepository.save(friend);
        }
        else{
            Friend friend = oneByUserId.get();
            System.out.println("friend = " + friend);
            String requestList = friend.getRequestList();
            System.out.println("requestList = " + requestList);
            JSONParser jsonParser = new JSONParser();
            try {
                JSONArray array = (JSONArray)jsonParser.parse(requestList);
                System.out.println("array.get(0) = " + array.get(0));
                System.out.println("array.get(1) = " + array.get(1));
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
            // return objectMapper.readValue(jsonString, RequestList.class);
//            String s = requestListJsonConverter.convertToDatabaseColumn(requestList);
//            System.out.println("s = " + s);
            //  RequestList requestList = friend.getRequestList();
          //  System.out.println("requestList = " + requestList);
           // friendRepository.save(friend);
        }

//        if(friendRepository.findOneByUserId(requestFriend.getFromUserId()).orElse(null) ==null){
//            Friend friend=Friend.builder()
//                    .userId(requestFriend.getFromUserId())
//                    .build();
//            friendRepository.save(friend);
//        }

return new DefaultResponse(StatusCode.OK, ResponseMessage.FRIEND_REQUEST_SUCCESS, null);

    }


}
