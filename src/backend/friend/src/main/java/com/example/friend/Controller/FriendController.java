package com.example.friend.Controller;

import com.example.friend.Dto.Request.FriendDto;
import com.example.friend.Dto.Request.FriendRequest;
import com.example.friend.Dto.Response.DefaultResponse;
import com.example.friend.Dto.Response.FriendListResponse;
import com.example.friend.Dto.Response.MyResponse;
import com.example.friend.Dto.Response.ResponseMessage;
import com.example.friend.Dto.Response.StatusCode;
import com.example.friend.Service.FriendService;
import com.example.friend.Util.CallApi;
import com.google.gson.Gson;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "friend-controller", description = "response data는 friend/list를 제외하고 모두 null입니다\n"
        + "toUserId는 요청을 보낼 사람의 id입니다.\n 예를들어 친구추가의경우 touserId는 내가 추가할 친구의 id입니다"
        +"\n 내 자신의 아이디는 accesstoken으로부터 auth/my를 호출해 얻어냅니다.")
public class FriendController {

    private final String userInfoUrl = "http://3.39.239.141:31436/auth/my";
    //  private final String userInfoUrl="http://localhost:8080/auth/test";
    private final FriendService friendService;


    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }


    @PostMapping("/create/list")
    @Operation(description = "얘는 테스트할때 썼던 애고 실제로는 회원가입할때 자동으로 친구테이블에 행이 생기게 해놔서 호출안해도됩니다")
    public ResponseEntity<DefaultResponse> createFriendList(
            @Valid @RequestBody FriendDto friendRequest) {
        System.out.println("requestFriend = " + friendRequest);
        DefaultResponse defaultResponse = friendService.createFriendList(friendRequest);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }

    @PostMapping("/request")
    public ResponseEntity<DefaultResponse> requestFriend(
            @Valid @RequestBody FriendRequest friendRequest,
            @RequestHeader String authorization) {
        System.out.println("authorization = " + authorization);
        MyResponse data = CallApi.httpGetConnection(userInfoUrl, null, authorization);

        System.out.println("data = " + data);

        HttpHeaders httpHeaders = new HttpHeaders();

        if (Objects.isNull(data)) {
            DefaultResponse defaultResponse1 = DefaultResponse.builder().data(null)
                    .code(StatusCode.NOT_FOUND).message(ResponseMessage.READ_USER_FAILURE).build();
            return new ResponseEntity<>(defaultResponse1, httpHeaders, HttpStatus.BAD_REQUEST);
        }

        FriendDto friendDto = FriendDto.builder()
                .myUserId(data.getUserId())
                .toUserId(friendRequest.getToUserId())
                .build();

        DefaultResponse defaultResponse = friendService.saveRequest(friendDto);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }

    @PostMapping("/refuse")
    public ResponseEntity<DefaultResponse> refuseFriend(
            @Valid @RequestBody FriendRequest friendRequest,
            @RequestHeader String authorization) {
        System.out.println("authorization = " + authorization);
        MyResponse data = CallApi.httpGetConnection(userInfoUrl, null, authorization);

        System.out.println("data = " + data);

        HttpHeaders httpHeaders = new HttpHeaders();

        if (Objects.isNull(data)) {
            DefaultResponse defaultResponse1 = DefaultResponse.builder().data(null)
                    .code(StatusCode.NOT_FOUND).message(ResponseMessage.READ_USER_FAILURE).build();
            return new ResponseEntity<>(defaultResponse1, httpHeaders, HttpStatus.BAD_REQUEST);
        }

        FriendDto friendDto = FriendDto.builder()
                .myUserId(data.getUserId())
                .toUserId(friendRequest.getToUserId())
                .build();

        DefaultResponse defaultResponse = friendService.refuseFriend(friendDto);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }

    @PostMapping("/accept")
    public ResponseEntity<DefaultResponse> acceptFriend(
            @Valid @RequestBody FriendRequest friendRequest,
            @RequestHeader String authorization) {
        System.out.println("authorization = " + authorization);
        MyResponse data = CallApi.httpGetConnection(userInfoUrl, null, authorization);

        System.out.println("data = " + data);

        HttpHeaders httpHeaders = new HttpHeaders();

        if (Objects.isNull(data)) {
            DefaultResponse defaultResponse1 = DefaultResponse.builder().data(null)
                    .code(StatusCode.NOT_FOUND).message(ResponseMessage.READ_USER_FAILURE).build();
            return new ResponseEntity<>(defaultResponse1, httpHeaders, HttpStatus.BAD_REQUEST);
        }

        FriendDto friendDto = FriendDto.builder()
                .myUserId(data.getUserId())
                .toUserId(friendRequest.getToUserId())
                .build();
        DefaultResponse defaultResponse = friendService.acceptFriend(friendDto);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<DefaultResponse> deleteFriend(
            @Valid @RequestBody FriendRequest friendRequest,
            @RequestHeader String authorization) {
        System.out.println("authorization = " + authorization);
        MyResponse data = CallApi.httpGetConnection(userInfoUrl, null, authorization);

        System.out.println("data = " + data);

        HttpHeaders httpHeaders = new HttpHeaders();

        if (Objects.isNull(data)) {
            DefaultResponse defaultResponse1 = DefaultResponse.builder().data(null)
                    .code(StatusCode.NOT_FOUND).message(ResponseMessage.READ_USER_FAILURE).build();
            return new ResponseEntity<>(defaultResponse1, httpHeaders, HttpStatus.BAD_REQUEST);
        }

        FriendDto friendDto = FriendDto.builder()
                .myUserId(data.getUserId())
                .toUserId(friendRequest.getToUserId())
                .build();
        DefaultResponse defaultResponse = friendService.deleteFriend(friendDto);
        ResponseEntity.ok().body(defaultResponse);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }

    @PostMapping("/list")
    public ResponseEntity<DefaultResponse<FriendListResponse>> getFriendList(
            @Valid @RequestBody FriendRequest friendRequest,
            @RequestHeader String authorization) {
        System.out.println("authorization = " + authorization);
        MyResponse data = CallApi.httpGetConnection(userInfoUrl, null, authorization);

        System.out.println("data = " + data);

        HttpHeaders httpHeaders = new HttpHeaders();

        if (Objects.isNull(data)) {
            DefaultResponse defaultResponse1 = DefaultResponse.builder().data(null)
                    .code(StatusCode.NOT_FOUND).message(ResponseMessage.READ_USER_FAILURE).build();
            return new ResponseEntity<>(defaultResponse1, httpHeaders, HttpStatus.BAD_REQUEST);
        }

        FriendDto friendDto = FriendDto.builder()
                .myUserId(data.getUserId())
                .toUserId(friendRequest.getToUserId())
                .build();

        DefaultResponse defaultResponse = friendService.getFriendList(friendDto);
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
