package com.example.friend.Controller;

import com.example.friend.Dto.Request.FriendRequest;
import com.example.friend.Dto.Response.DefaultResponse;
import com.example.friend.Service.FriendService;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/friend")
public class FriendController {

    private final FriendService friendService;

    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @PostMapping("/create/list")
    public ResponseEntity<DefaultResponse> createFriendList(@Valid @RequestBody FriendRequest friendRequest){
        System.out.println("requestFriend = " + friendRequest);
        DefaultResponse defaultResponse = friendService.createFriendList(friendRequest);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }

    @PostMapping("/request")
    public ResponseEntity<DefaultResponse> requestFriend(@Valid @RequestBody FriendRequest friendRequest){
        System.out.println("requestFriend = " + friendRequest);
        DefaultResponse defaultResponse = friendService.saveRequest(friendRequest);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }

    @PostMapping("/refuse")
    public ResponseEntity<DefaultResponse> refuseFriend(@Valid @RequestBody FriendRequest friendRequest){

        DefaultResponse defaultResponse = friendService.refuseFriend(friendRequest);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse,HttpStatus.OK);
    }

    @PostMapping("/accept")
    public ResponseEntity<DefaultResponse> acceptFriend(@Valid @RequestBody FriendRequest friendRequest){
        DefaultResponse defaultResponse = friendService.acceptFriend(friendRequest);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }
}
