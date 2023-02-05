package com.example.friend.Service;


import com.example.friend.Dto.Request.RequestFriend;
import com.example.friend.Dto.Response.DefaultResponse;
import com.example.friend.Dto.Response.ResponseMessage;
import com.example.friend.Dto.Response.StatusCode;
import com.example.friend.Entity.Friend;
import com.example.friend.Repository.FriendRepository;
import java.util.Optional;
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
            Friend friend=Friend.builder()
                    .userId(requestFriend.getFromUserId())
                    .requestList(requestFriend.getToUserId().toString())
                    .build();
            friendRepository.save(friend);
        }
        else{
            Friend friend = oneByUserId.get();
            friend.setRequestList(requestFriend.getToUserId().toString());
            friendRepository.save(friend);
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
