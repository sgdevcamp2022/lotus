package com.example.auth.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@RedisHash(value = "refreshtoken", timeToLive = 604800)
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    private String id;

    @Indexed
    private Long userId;

    private String refreshToken;



    public RefreshToken(String refreshToken, Long userId) {
        this.userId=userId;
        this.refreshToken = refreshToken;
    }
}