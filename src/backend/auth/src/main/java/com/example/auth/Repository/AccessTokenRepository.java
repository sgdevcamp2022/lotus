package com.example.auth.Repository;


import com.example.auth.Entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface AccessTokenRepository extends CrudRepository<RefreshToken, String> {

    RefreshToken findRefreshTokenByEmail(String email);
    RefreshToken findRefreshTokenByUserId(Long userId);
    RefreshToken findRefreshTokenByEmailAndProvider(String email, String provider);
}
