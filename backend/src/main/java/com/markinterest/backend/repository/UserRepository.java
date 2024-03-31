package com.markinterest.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.markinterest.backend.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

	User findByEmail(String email);

}
