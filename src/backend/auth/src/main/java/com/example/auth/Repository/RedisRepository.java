package com.example.auth.Repository;


import com.example.auth.Entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RedisRepository extends CrudRepository<RefreshToken, String> {

    RefreshToken findRefreshTokenByUsername(String username);
}
