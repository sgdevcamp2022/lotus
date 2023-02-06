package com.example.friend.Controller;

import com.example.friend.Dto.Request.RequestFriend;
import com.example.friend.Dto.Response.DefaultResponse;
import com.example.friend.Service.FriendService;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PostMapping("/request")
    public ResponseEntity<DefaultResponse> requestFriend(@Valid @RequestBody RequestFriend requestFriend){
        System.out.println("requestFriend = " + requestFriend);
        DefaultResponse defaultResponse = friendService.saveRequest(requestFriend);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }
}