package com.example.auth.Entity;

import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@RedisHash(value="accesstoken")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccessToken {


    @Id
    private String id;

    @Indexed
    private Long userId;

    private String accessToken;

    @TimeToLive
    private Long expiration;


    public AccessToken(Long userId, String accessToken, Long expiration) {
        this.userId = userId;
        this.accessToken = accessToken;
        this.expiration = expiration;
    }
}
