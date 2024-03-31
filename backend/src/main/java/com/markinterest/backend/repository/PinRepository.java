package com.markinterest.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.markinterest.backend.model.Pin;
import com.markinterest.backend.model.User;

@Repository
public interface PinRepository extends MongoRepository<Pin, String> {
	
	List<Pin> findByCategory(String category);
	List<Pin> findBySave(String email);
	List<Pin> findByPostedby(String email);
}
