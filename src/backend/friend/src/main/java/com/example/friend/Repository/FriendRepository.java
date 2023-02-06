package com.example.friend.Repository;

import com.example.friend.Entity.Friend;
import com.example.friend.Entity.User;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Long> {
   Optional<Friend> findOneByUserId(Long userId);

  // List<User>findByUserIdList(ArrayList<Long> userIdList);

}
