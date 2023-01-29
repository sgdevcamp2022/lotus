package com.example.auth.Repository;


import com.example.auth.Entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RedisRepository extends CrudRepository<RefreshToken, String> {

    RefreshToken findRefreshTokenByEmail(String email);
    RefreshToken findRefreshTokenByUserId(Long userId);
    RefreshToken findRefreshTokenByEmailAndProvider(String email, String provider);
}
