package com.example.notification.Controller;

import com.example.notification.Dto.Request.RequestMessage;
import com.example.notification.Dto.Request.RequestType;
import com.example.notification.Fcm.FirebaseCloudMessageService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.v3.oas.annotations.Operation;
import java.io.IOException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    private final FirebaseCloudMessageService firebaseCloudMessageService;

    public NotificationController(FirebaseCloudMessageService firebaseCloudMessageService) {
        this.firebaseCloudMessageService = firebaseCloudMessageService;
    }

//    @PostMapping("/send")
//    public ResponseEntity pushMessage(@RequestBody RequestMessage requestMessage)
//            throws IOException {
//
//        if(requestMessage.getRequestType().equals(RequestType.COMMENT)){
//            firebaseCloudMessageService.sendMessageTo(
//                    requestMessage.getTargetToken(),
//                    requestMessage.getTitle(),
//                    "새 댓글이 달렸어요: "+requestMessage.getBody());
//        }
//        else if(requestMessage.getRequestType().equals(RequestType.FRIEND_REQUEST)){
//            firebaseCloudMessageService.sendMessageTo(
//                    requestMessage.getTargetToken(),
//                    requestMessage.getTitle(),
//                    requestMessage.getNickname()+"님이 친구요청을 하셨어요");
//        }
//        else if(requestMessage.getRequestType().equals(RequestType.FRIEND_ACCEPT)){
//            firebaseCloudMessageService.sendMessageTo(
//                    requestMessage.getTargetToken(),
//                    requestMessage.getTitle(),
//                    requestMessage.getNickname()+"님이 친구수락을 하셨어요");
//        }
//
//
//
//
//        return ResponseEntity.ok().build();
//    }


    @PostMapping("/comment")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "body", value = "댓글 내용", required = true),
            @ApiImplicitParam(name = "characterName", value = "캐릭터 네임", required = true, dataType = "string"),
            @ApiImplicitParam(name = "targetToken", value = "보내고 싶은 기기", required = true, dataType = "string"),
            @ApiImplicitParam(name = "title", value = "제목", required = false, dataType = "string", defaultValue="loatus"),
    })
    @Operation(description = "알림 예시) 새 댓글이 달렸어요: 댓댓아라잌댓")
    public ResponseEntity pushComment(@RequestBody RequestMessage requestMessage)
            throws IOException {

        firebaseCloudMessageService.sendMessageTo(
                requestMessage.getTargetToken(),
                requestMessage.getTitle(),
                "새 댓글이 달렸어요: " + requestMessage.getBody());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/friend/request")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "body", value = "안 쓰입니다", required = false),
            @ApiImplicitParam(name = "characterName", value = "캐릭터 네임", required = true, dataType = "string"),
            @ApiImplicitParam(name = "targetToken", value = "보내고 싶은 기기", required = true, dataType = "string"),
            @ApiImplicitParam(name = "title", value = "제목", required = false, dataType = "string", defaultValue="loatus"),
    })
    @Operation(description = "알림 예시) 조안녕안녕님이 친구요청을 하셨어요")
    public ResponseEntity pushFriendRequest(@RequestBody RequestMessage requestMessage)
            throws IOException {

        firebaseCloudMessageService.sendMessageTo(
                requestMessage.getTargetToken(),
                requestMessage.getTitle(),
                requestMessage.getCharacterName() + "님이 친구요청을 하셨어요");

        return ResponseEntity.ok().build();
    }

    @PostMapping("/friend/accept")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "body", value = "안 쓰입니다", required = false),
            @ApiImplicitParam(name = "characterName", value = "캐릭터 네임", required = true, dataType = "string"),
            @ApiImplicitParam(name = "targetToken", value = "보내고 싶은 기기", required = true, dataType = "string"),
            @ApiImplicitParam(name = "title", value = "제목", required = false, dataType = "string", defaultValue="loatus"),
    })
    @Operation(description = "알림 예시) 조안녕안녕님이 친구수락을 하셨어요")
    public ResponseEntity pushFriendAccept(@RequestBody RequestMessage requestMessage)
            throws IOException {

        firebaseCloudMessageService.sendMessageTo(
                requestMessage.getTargetToken(),
                requestMessage.getTitle(),
                requestMessage.getCharacterName() + "님이 친구수락을 하셨어요");

        return ResponseEntity.ok().build();
    }


//    @PostMapping("/lostark/event")
//    public ResponseEntity pushMessage(@RequestBody RequestMessage requestMessage)
//            throws IOException {
//
//    }


}
