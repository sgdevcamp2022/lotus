package com.example.notification.Controller;

import com.example.notification.Dto.Request.RequestMessage;
import com.example.notification.Dto.Request.RequestType;
import com.example.notification.Fcm.FirebaseCloudMessageService;
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

    @PostMapping("/send")
    public ResponseEntity pushMessage(@RequestBody RequestMessage requestMessage)
            throws IOException {

        if(requestMessage.getRequestType().equals(RequestType.COMMENT)){
            firebaseCloudMessageService.sendMessageTo(
                    requestMessage.getTargetToken(),
                    requestMessage.getTitle(),
                    "새 댓글이 달렸어요: "+requestMessage.getBody());
        }
        else if(requestMessage.getRequestType().equals(RequestType.FRIEND_REQUEST)){
            firebaseCloudMessageService.sendMessageTo(
                    requestMessage.getTargetToken(),
                    requestMessage.getTitle(),
                    requestMessage.getNickname()+"님이 친구요청을 하셨어요");
        }
        else if(requestMessage.getRequestType().equals(RequestType.FRIEND_ACCEPT)){
            firebaseCloudMessageService.sendMessageTo(
                    requestMessage.getTargetToken(),
                    requestMessage.getTitle(),
                    requestMessage.getNickname()+"님이 친구수락을 하셨어요");
        }




        return ResponseEntity.ok().build();
    }



}
