package com.example.friend.Repository;

import com.example.friend.Entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User,Long> {
   // List<User> findByUserIdList(List<Long> userIdList);
    //List<User> findAllByUserIdList(List<Long> userIdList);

    @Query(nativeQuery = true, value="SELECT * FROM user as u WHERE u.user_id IN (:ids)")
    List<User> findByUserId(@Param("ids") List<Long> ids);
}
