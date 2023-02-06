package com.example.friend.Dto.Request;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequest {
    @NotNull
    private Long fromUserId;
    @NotNull
    private Long toUserId;
}
