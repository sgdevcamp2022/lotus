package com.example.friend.Repository;

import com.example.friend.Entity.Friend;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Long> {
   Optional<Friend> findOneByUserId(Long userId);
}
