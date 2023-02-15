package com.example.notification.Controller;

import com.example.notification.Dto.Request.RequestDto;
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
    public ResponseEntity pushMessage(@RequestBody RequestDto requestDTO) throws IOException {
        System.out.println(requestDTO.getTargetToken() + " "
                +requestDTO.getTitle() + " " + requestDTO.getBody());

        firebaseCloudMessageService.sendMessageTo(
                requestDTO.getTargetToken(),
                requestDTO.getTitle(),
                requestDTO.getBody());
        return ResponseEntity.ok().build();
    }
}
