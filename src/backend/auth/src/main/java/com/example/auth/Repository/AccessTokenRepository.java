package com.example.auth.Repository;


import com.example.auth.Entity.AccessToken;
import com.example.auth.Entity.RefreshToken;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface AccessTokenRepository extends CrudRepository<AccessToken, Long> {

    Optional<AccessToken> findAccessTokenByUserId(Long userId);
}
