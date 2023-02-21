package com.example.auth.Repository;

import com.example.auth.Entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByEmail(String email);

    Optional<User> findOneByEmail(String email);

    Optional<User> findOneByEmailAndProvider(String email, String provider);

    Optional<User> findOneByUserId(Long userId);

}
