package com.example.friend.Service;


import com.example.friend.Dto.Request.FriendDto;
import com.example.friend.Dto.Request.FriendRequest;
import com.example.friend.Dto.Response.DefaultResponse;
import com.example.friend.Dto.Response.FriendListResponse;
import com.example.friend.Dto.Response.ResponseMessage;
import com.example.friend.Dto.Response.StatusCode;
import com.example.friend.Entity.Friend;

import com.example.friend.Entity.User;
import com.example.friend.Repository.FriendRepository;

import com.example.friend.Repository.UserRepository;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
    private final UserRepository userRepository;

    public FriendService(FriendRepository friendRepository, UserRepository userRepository) {
        this.friendRepository = friendRepository;
        this.userRepository = userRepository;
    }


    @Transactional
    public DefaultResponse createFriendList(FriendDto friendRequest) {

        Optional<Friend> oneByUserId = friendRepository.findOneByUserId(
                friendRequest.getMyUserId());

        if (oneByUserId.isEmpty()) {
            JSONArray blackList = new JSONArray();
            JSONArray friendList = new JSONArray();
            JSONArray requestList = new JSONArray();
            JSONArray requestTime = new JSONArray();

            Friend friend = Friend.builder()
                    .userId(friendRequest.getMyUserId())
                    .blackList(blackList.toJSONString())
                    .friendList(friendList.toJSONString())
                    .requestList(requestList.toJSONString())
                    .requestTime(requestTime.toJSONString())
                    .build();
            friendRepository.save(friend);
        }

        return new DefaultResponse(StatusCode.OK, ResponseMessage.FRIENDLIST_CREATE_SUCCESS, null);

    }

    @Transactional(readOnly = true)
    public JSONArray getFriendIdList(FriendDto friendRequest) {

        Optional<Friend> oneByUserId = friendRepository.findOneByUserId(
                friendRequest.getMyUserId());
        Friend friend = oneByUserId.get();
        String friendList = friend.getFriendList();
        JSONParser jsonParser = new JSONParser();

        try {
            JSONArray friendArray =(JSONArray) jsonParser.parse(friendList);
            return friendArray;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public DefaultResponse getFriendList(FriendDto friendRequest) {

        JSONArray friendIdList = getFriendIdList(friendRequest);
        System.out.println("friendIdList = " + friendIdList);
        System.out.println("friendIdList.size() = " + friendIdList.size());

        ArrayList<Long> list=new ArrayList<Long>();

        for(int i=0; i<friendIdList.size(); i++){
            Object o = friendIdList.get(i);
            JSONObject o1=(JSONObject) o;
            System.out.println(o1.get("id"));
            Long.parseLong(o1.get("id").toString());
            list.add(Long.parseLong(o1.get("id").toString()));
            System.out.println(friendIdList.get(i).toString());
        }
        System.out.println("list = " + list);
        List<User> byUserIds = userRepository.findByUserId(list);
        System.out.println("byUserIds.size() = " + byUserIds.size());
        List<FriendListResponse> friendListResponses=new ArrayList<>();
        for(User user :byUserIds){
            System.out.println("user = " + user.getUserId());
            System.out.println("user = " + user);
            System.out.println("user.getNickname() = " + user.getNickname());
            FriendListResponse friendListResponse=FriendListResponse.builder()
                    .userId(user.getUserId())
                    .characterName(user.getCharacter_name())
                    .profileImage(user.getProfile_image())
                    .nickname(user.getNickname())
                    .friendCount(friendIdList.size())
                    .build();
            friendListResponses.add(friendListResponse);
        }

        return new DefaultResponse<>(StatusCode.OK, ResponseMessage.FRIEND_LIST_SUCCESS, friendListResponses);

    }


    @Transactional
    public DefaultResponse saveRequest(FriendDto friendRequest) {
        System.out.println("friendRequest = " + friendRequest);
        Date now = new Date();
//        SimpleDateFormat sdf1=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일");
        String nowTime = sdf.format(now);

        Optional<Friend> oneByUserId = friendRepository.findOneByUserId(
                friendRequest.getToUserId());

        JSONObject requestJsonObject = new JSONObject();
        requestJsonObject.put("id", friendRequest.getMyUserId());
        JSONObject timeJsonObject = new JSONObject();
        timeJsonObject.put("time", nowTime);

        Friend friend = oneByUserId.get();
        String requestList = friend.getRequestList();
        String requestTime = friend.getRequestTime();
        JSONParser jsonParser = new JSONParser();
        try {
            JSONArray requestArray = (JSONArray) jsonParser.parse(requestList);
            JSONArray timeArray = (JSONArray) jsonParser.parse(requestTime);
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
    public DefaultResponse refuseFriend(FriendDto friendRequest) {
        Optional<Friend> oneByUserId = friendRepository.findOneByUserId(
                friendRequest.getMyUserId());
        Friend friend = oneByUserId.get();
        String requestList = friend.getRequestList();
        String requestTime = friend.getRequestTime();
        JSONParser jsonParser = new JSONParser();
        try {
            JSONArray requestArray = (JSONArray) jsonParser.parse(requestList);
            JSONArray requestTimeArray = (JSONArray) jsonParser.parse(requestTime);
            System.out.println("requestArray = " + requestArray);
            int idx = -1;

            for (int i = 0; i < requestArray.size(); i++) {
                Object o = requestArray.get(i);
                JSONObject o1 = (JSONObject) o;
                if (o1.get("id") == friendRequest.getToUserId()) {
                    idx = i;
                }
            }

            if (idx >= 0) {
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
    public DefaultResponse acceptFriend(FriendDto friendRequest) {
        Optional<Friend> oneByUserId = friendRepository.findOneByUserId(
                friendRequest.getMyUserId());
        Friend friend = oneByUserId.get();
        String requestList = friend.getRequestList();
        String requestTime = friend.getRequestTime();
        String friendList = friend.getFriendList();
        JSONParser jsonParser = new JSONParser();
        try {
            JSONArray requestArray = (JSONArray) jsonParser.parse(requestList);
            JSONArray friendArray = (JSONArray) jsonParser.parse(friendList);
            JSONArray requestTimeArray = (JSONArray) jsonParser.parse(requestTime);

            int idx = -1;
            JSONObject newFriend = new JSONObject();
            for (int i = 0; i < requestArray.size(); i++) {
                Object o = requestArray.get(i);
                JSONObject o1 = (JSONObject) o;
                if (o1.get("id") == friendRequest.getToUserId()) {
                    idx = i;
                    newFriend.put("id", o1.get("id"));
                }
            }

            if (idx >= 0) {
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


    @Transactional
    public DefaultResponse deleteFriend(FriendDto friendRequest) {
        Optional<Friend> oneByUserId = friendRepository.findOneByUserId(
                friendRequest.getMyUserId());
        Friend friend = oneByUserId.get();
        String friendList = friend.getFriendList();
        JSONParser jsonParser = new JSONParser();
        try {
            JSONArray requestArray = (JSONArray) jsonParser.parse(friendList);
            System.out.println("requestArray = " + requestArray);
            int idx = -1;

            for (int i = 0; i < requestArray.size(); i++) {
                Object o = requestArray.get(i);
                JSONObject o1 = (JSONObject) o;
                if (o1.get("id") == friendRequest.getToUserId()) {
                    idx = i;
                }
            }

            if (idx >= 0) {
                requestArray.remove(idx);
            }
            oneByUserId.get().setFriendList(requestArray.toJSONString());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return new DefaultResponse(StatusCode.OK, ResponseMessage.FRIEND_DELETE_SUCCESS, null);

    }

}
