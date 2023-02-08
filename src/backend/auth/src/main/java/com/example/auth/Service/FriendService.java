package com.example.auth.Service;

import com.example.auth.Dto.Response.DefaultResponse;
import com.example.auth.Entity.Friend;
import com.example.auth.Jwt.TokenProvider;
import com.example.auth.Repository.FriendRepository;
import java.util.Optional;
import org.json.simple.JSONArray;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FriendService {

    private final FriendRepository friendRepository;
    private final TokenProvider tokenProvider;

    public FriendService(FriendRepository friendRepository, TokenProvider tokenProvider) {
        this.friendRepository = friendRepository;
        this.tokenProvider = tokenProvider;
    }


    @Transactional
    public void createFriendList(Long userId) {


            JSONArray blackList = new JSONArray();
            JSONArray friendList = new JSONArray();
            JSONArray requestList = new JSONArray();
            JSONArray requestTime = new JSONArray();

            Friend friend = Friend.builder()
                    .userId(userId)
                    .blackList(blackList.toJSONString())
                    .friendList(friendList.toJSONString())
                    .requestList(requestList.toJSONString())
                    .requestTime(requestTime.toJSONString())
                    .build();
            friendRepository.save(friend);


    }

}
