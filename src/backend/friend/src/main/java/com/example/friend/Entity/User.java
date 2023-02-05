package com.example.friend.Entity;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "`user`")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "nickname", length = 50)
    private String nickname;

    @Column(name = "activated")
    private boolean activated;

    @Column(name = "auth", length = 50)
    private String auth;

    @Column(name = "profile_image", length = 100)
    private String profile_image;

    @Column(name = "provider", length = 10)
    private String provider;

    @Column(name = "stove_no", length = 15)
    private String stove_no;

    @Column(name = "character_name", length = 50)
    private String character_name;


    public User update(String profile_image, String nickname) {
        this.profile_image = profile_image;
        this.nickname = nickname;
        return this;
    }
}
