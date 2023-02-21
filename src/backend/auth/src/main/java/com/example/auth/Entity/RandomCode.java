package com.example.auth.Entity;

import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@RedisHash(value = "randomcode", timeToLive = 900)
@NoArgsConstructor
@AllArgsConstructor
public class RandomCode {

    @Id
    private String id;

    @Indexed
    private Long userId;

    private String randomCode;


    public RandomCode(String randomCode, Long userId) {
        this.userId = userId;
        this.randomCode = randomCode;
    }
}
