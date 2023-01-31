package com.example.auth.Repository;

import com.example.auth.Entity.RandomCode;
import org.springframework.data.repository.CrudRepository;

public interface RandomCodeRepository extends CrudRepository<RandomCode, Long> {

    RandomCode findRandomCodeByUserId(Long userId);

}
