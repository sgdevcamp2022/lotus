package com.example.friend.Service;


import com.example.friend.Dto.Request.FriendRequest;
import com.example.friend.Dto.Response.DefaultResponse;
import com.example.friend.Dto.Response.ResponseMessage;
import com.example.friend.Dto.Response.StatusCode;
import com.example.friend.Entity.Friend;

import com.example.friend.Repository.FriendRepository;

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
    public DefaultResponse createFriendList(FriendRequest friendRequest) {

        Optional<Friend> oneByUserId = friendRepository.findOneByUserId(
                friendRequest.getFromUserId());




        if(oneByUserId.isEmpty()){
            JSONArray blackList = new JSONArray();
            JSONArray friendList = new JSONArray();
            JSONArray requestList = new JSONArray();
            JSONArray requestTime = new JSONArray();

            Friend friend=Friend.builder()
                    .userId(friendRequest.getFromUserId())
                    .blackList(blackList.toJSONString())
                    .friendList(friendList.toJSONString())
                    .requestList(requestList.toJSONString())
                    .requestTime(requestTime.toJSONString())
                    .build();
            friendRepository.save(friend);
        }

        return new DefaultResponse(StatusCode.OK, ResponseMessage.FRIENDLIST_CREATE_SUCCESS, null);

    }


    @Transactional
    public DefaultResponse saveRequest(FriendRequest friendRequest) {
        Date now = new Date();
//        SimpleDateFormat sdf1=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy년 MM월 dd일");
        String nowTime = sdf.format(now);

        Optional<Friend> oneByUserId = friendRepository.findOneByUserId(
                friendRequest.getFromUserId());

        JSONObject requestJsonObject = new JSONObject();
        requestJsonObject.put("id", friendRequest.getToUserId());
        JSONObject timeJsonObject = new JSONObject();
        timeJsonObject.put("time",nowTime);

//
//        if(oneByUserId.isEmpty()){
//            JSONArray jsonArray = new JSONArray();
//            JSONArray jsonArray2 = new JSONArray();
//            jsonArray.add(requestJsonObject);
//            jsonArray2.add(timeJsonObject);
//            Friend friend=Friend.builder()
//                    .userId(friendRequest.getFromUserId())
//                    .requestList(jsonArray.toJSONString())
//                    .requestTime(jsonArray2.toJSONString())
//                    .build();
//            friendRepository.save(friend);
//        }

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

return new DefaultResponse(StatusCode.OK, ResponseMessage.FRIEND_REQUEST_SUCCESS, null);

    }

    @Transactional
    public DefaultResponse refuseFriend(FriendRequest friendRequest){
        Optional<Friend> oneByUserId = friendRepository.findOneByUserId(
                friendRequest.getFromUserId());
        Friend friend = oneByUserId.get();
        String requestList = friend.getRequestList();
        String requestTime = friend.getRequestTime();
        JSONParser jsonParser = new JSONParser();
        try {
            JSONArray requestArray = (JSONArray)jsonParser.parse(requestList);
            JSONArray requestTimeArray = (JSONArray)jsonParser.parse(requestTime);
            System.out.println("requestArray = " + requestArray);
            int idx=-1;

            for(int i=0; i<requestArray.size(); i++){
                Object o = requestArray.get(i);
                JSONObject o1 = (JSONObject) o;
                if(o1.get("id")==friendRequest.getToUserId()){
                    idx=i;
                }
            }

            if(idx>=0){
                requestArray.remove(idx);
                requestTimeArray.remove(idx);
            }
            oneByUserId.get().setRequestList(requestArray.toJSONString());
            oneByUserId.get().setRequestTime(requestTimeArray.toJSONString());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return new DefaultResponse(StatusCode.OK, ResponseMessage.FRIEND_REFUSE_SUCCESS, null);

    }

    @Transactional
    public DefaultResponse acceptFriend(FriendRequest friendRequest){
        Optional<Friend> oneByUserId = friendRepository.findOneByUserId(
                friendRequest.getFromUserId());
        Friend friend = oneByUserId.get();
        String requestList = friend.getRequestList();
        String requestTime = friend.getRequestTime();
        String friendList = friend.getFriendList();
        JSONParser jsonParser = new JSONParser();
        try {
            JSONArray requestArray = (JSONArray)jsonParser.parse(requestList);
            JSONArray friendArray = (JSONArray)jsonParser.parse(friendList);
            JSONArray requestTimeArray = (JSONArray)jsonParser.parse(requestTime);

            int idx=-1;
            JSONObject newFriend=new JSONObject();
            for(int i=0; i<requestArray.size(); i++){
                Object o = requestArray.get(i);
                JSONObject o1 = (JSONObject) o;
                if(o1.get("id")==friendRequest.getToUserId()){
                    idx=i;
                    newFriend.put("id", o1.get("id"));
                }
            }

            if(idx>=0){
                requestArray.remove(idx);
                requestTimeArray.remove(idx);
                friendArray.add(newFriend);
            }
            oneByUserId.get().setRequestList(requestArray.toJSONString());
            oneByUserId.get().setFriendList(friendArray.toJSONString());
            oneByUserId.get().setRequestTime(requestTimeArray.toJSONString());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return new DefaultResponse(StatusCode.OK, ResponseMessage.FRIEND_ACCEPT_SUCCESS, null);

    }

}
