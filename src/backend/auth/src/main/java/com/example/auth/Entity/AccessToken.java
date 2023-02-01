//package com.example.auth.Entity;
//
//
//import javax.persistence.Id;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import org.springframework.data.redis.core.RedisHash;
//import org.springframework.data.redis.core.index.Indexed;
//
//@Getter
//@RedisHash(value = "refreshtoken", timeToLive = 604800)
//@NoArgsConstructor
//@AllArgsConstructor
//public class AccessToken {
//
//    @Id
//    private String id;
//
//    @Indexed
//    private Long userId;
//
//    private String accessToken;
//    private
//
//
//    public RefreshToken(String refreshToken, Long userId) {
//        this.userId=userId;
//        this.refreshToken = refreshToken;
//    }
//
//}
