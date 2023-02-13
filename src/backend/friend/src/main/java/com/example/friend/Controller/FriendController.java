package com.example.friend.Controller;

import com.example.friend.Dto.Request.FriendRequest;
import com.example.friend.Dto.Response.DefaultResponse;
import com.example.friend.Dto.Response.MyResponse;
import com.example.friend.Dto.Response.ResponseMessage;
import com.example.friend.Dto.Response.StatusCode;
import com.example.friend.Service.FriendService;
import com.example.friend.Util.CallApi;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.Objects;
import javax.validation.Valid;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/friend")
public class FriendController {
    private final String userInfoUrl="http://3.39.239.141:32513/auth/my";
  //  private final String userInfoUrl="http://localhost:8080/auth/test";
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
    public ResponseEntity<DefaultResponse> requestFriend(@Valid @RequestBody FriendRequest friendRequest,
            @RequestHeader String authorization){
        System.out.println("authorization = " + authorization);
        MyResponse data = CallApi.httpGetConnection(userInfoUrl, null, authorization);

        System.out.println("data = " + data);

        HttpHeaders httpHeaders=new HttpHeaders();

        if(Objects.isNull(data)){
            DefaultResponse defaultResponse1 = DefaultResponse.builder().data(null)
                    .code(StatusCode.NOT_FOUND).message(ResponseMessage.READ_USER_FAILURE).build();
            return new ResponseEntity<>(defaultResponse1, httpHeaders, HttpStatus.BAD_REQUEST );
        }
        friendRequest.setMyUserId(data.getUserId());

        DefaultResponse defaultResponse = friendService.saveRequest(friendRequest);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }

    @PostMapping("/refuse")
    public ResponseEntity<DefaultResponse> refuseFriend(@Valid @RequestBody FriendRequest friendRequest,
            @RequestHeader String authorization){
        System.out.println("authorization = " + authorization);
        MyResponse data = CallApi.httpGetConnection(userInfoUrl, null, authorization);

        System.out.println("data = " + data);

        HttpHeaders httpHeaders=new HttpHeaders();

        if(Objects.isNull(data)){
            DefaultResponse defaultResponse1 = DefaultResponse.builder().data(null)
                    .code(StatusCode.NOT_FOUND).message(ResponseMessage.READ_USER_FAILURE).build();
            return new ResponseEntity<>(defaultResponse1, httpHeaders, HttpStatus.BAD_REQUEST );
        }
        friendRequest.setMyUserId(data.getUserId());

        DefaultResponse defaultResponse = friendService.refuseFriend(friendRequest);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse,HttpStatus.OK);
    }

    @PostMapping("/accept")
    public ResponseEntity<DefaultResponse> acceptFriend(@Valid @RequestBody FriendRequest friendRequest,
            @RequestHeader String authorization){
        System.out.println("authorization = " + authorization);
        MyResponse data = CallApi.httpGetConnection(userInfoUrl, null, authorization);

        System.out.println("data = " + data);

        HttpHeaders httpHeaders=new HttpHeaders();

        if(Objects.isNull(data)){
            DefaultResponse defaultResponse1 = DefaultResponse.builder().data(null)
                    .code(StatusCode.NOT_FOUND).message(ResponseMessage.READ_USER_FAILURE).build();
            return new ResponseEntity<>(defaultResponse1, httpHeaders, HttpStatus.BAD_REQUEST );
        }
        friendRequest.setMyUserId(data.getUserId());
        DefaultResponse defaultResponse = friendService.acceptFriend(friendRequest);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<DefaultResponse> deleteFriend(@Valid @RequestBody FriendRequest friendRequest,
            @RequestHeader String authorization){
        System.out.println("authorization = " + authorization);
        MyResponse data = CallApi.httpGetConnection(userInfoUrl, null, authorization);

        System.out.println("data = " + data);

        HttpHeaders httpHeaders=new HttpHeaders();

        if(Objects.isNull(data)){
            DefaultResponse defaultResponse1 = DefaultResponse.builder().data(null)
                    .code(StatusCode.NOT_FOUND).message(ResponseMessage.READ_USER_FAILURE).build();
            return new ResponseEntity<>(defaultResponse1, httpHeaders, HttpStatus.BAD_REQUEST );
        }
        friendRequest.setMyUserId(data.getUserId());
        DefaultResponse defaultResponse = friendService.deleteFriend(friendRequest);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }

    @PostMapping("/list")
    public ResponseEntity<DefaultResponse> getFriendList(@Valid @RequestBody FriendRequest friendRequest,
            @RequestHeader String authorization){
        System.out.println("authorization = " + authorization);
        MyResponse data = CallApi.httpGetConnection(userInfoUrl, null, authorization);

        System.out.println("data = " + data);

        HttpHeaders httpHeaders=new HttpHeaders();

        if(Objects.isNull(data)){
            DefaultResponse defaultResponse1 = DefaultResponse.builder().data(null)
                    .code(StatusCode.NOT_FOUND).message(ResponseMessage.READ_USER_FAILURE).build();
            return new ResponseEntity<>(defaultResponse1, httpHeaders, HttpStatus.BAD_REQUEST );
        }
        friendRequest.setMyUserId(data.getUserId());

        DefaultResponse defaultResponse = friendService.getFriendList(friendRequest);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }



//    @PostMapping("/create/list")
//    public ResponseEntity<DefaultResponse> createFriendList(@Valid @RequestBody FriendRequest friendRequest){
//        System.out.println("requestFriend = " + friendRequest);
//        DefaultResponse defaultResponse = friendService.createFriendList(friendRequest);
//        ResponseEntity.ok().body(defaultResponse);
//        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
//    }
//
//    @PostMapping("/request")
//    public ResponseEntity<DefaultResponse> requestFriend(@Valid @RequestBody FriendRequest friendRequest){
//        System.out.println("requestFriend = " + friendRequest);
//        callApi.httpPostBodyConnection()
//        DefaultResponse defaultResponse = friendService.saveRequest(friendRequest);
//        ResponseEntity.ok().body(defaultResponse);
//        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
//    }
//
//    @PostMapping("/refuse")
//    public ResponseEntity<DefaultResponse> refuseFriend(@Valid @RequestBody FriendRequest friendRequest){
//
//        DefaultResponse defaultResponse = friendService.refuseFriend(friendRequest);
//        ResponseEntity.ok().body(defaultResponse);
//        return new ResponseEntity<>(defaultResponse,HttpStatus.OK);
//    }
//
//    @PostMapping("/accept")
//    public ResponseEntity<DefaultResponse> acceptFriend(@Valid @RequestBody FriendRequest friendRequest){
//        DefaultResponse defaultResponse = friendService.acceptFriend(friendRequest);
//        ResponseEntity.ok().body(defaultResponse);
//        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
//    }
//
//    @PostMapping("/delete")
//    public ResponseEntity<DefaultResponse> deleteFriend(@Valid @RequestBody FriendRequest friendRequest){
//        DefaultResponse defaultResponse = friendService.deleteFriend(friendRequest);
//        ResponseEntity.ok().body(defaultResponse);
//        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
//    }
//
//    @PostMapping("/list")
//    public ResponseEntity<DefaultResponse> getFriendList(@Valid @RequestBody FriendRequest friendRequest){
//        DefaultResponse defaultResponse = friendService.getFriendList(friendRequest);
//        ResponseEntity.ok().body(defaultResponse);
//        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
//    }




}
