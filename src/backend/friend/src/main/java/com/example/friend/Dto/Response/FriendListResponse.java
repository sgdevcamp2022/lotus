package com.example.friend.Dto.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendListResponse {
    private Long userId;
    private String nickname;
    private String profileImage;
    private String characterName;
    private int friendCount;
}
