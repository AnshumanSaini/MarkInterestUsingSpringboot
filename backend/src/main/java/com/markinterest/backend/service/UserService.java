package com.markinterest.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.markinterest.backend.model.User;
import com.markinterest.backend.repository.UserRepository;

@Service
public class UserService {


	@Value("${jwt.expiration}")
	private int jwtExpirationMs;
	
	@Value("${jwt.secret}")
	private String jwtSecret;
	
	@Autowired
	UserRepository user_repo;

	private Security sec=new Security();
	

	public String login(User user) {
//		System.out.println(jwtExpirationMs);
		try
		{
//			System.out.println(user_repo.findByEmail(user.getEmail()).toString());
			if (user_repo.findByEmail(user.getEmail()) == null) {
				user_repo.save(user);
				String token = sec.generateJwtToken(user_repo.findByEmail(user.getEmail()).get_id(), jwtExpirationMs, jwtSecret);
				return token;
			} else {
				User data = user_repo.findByEmail(user.getEmail());
				String token = sec.generateJwtToken(data.get_id(), jwtExpirationMs, jwtSecret);
				return token;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			return "Error Occured!!!";
		}
	}
	
	public User getUser(String token) {
		String id=sec.fetchUser(token, jwtSecret);
//		System.out.println("ID "+id);
		Optional<User> data = user_repo.findById(id);
		if(data.isPresent()) {
			return data.get();
		}
		return null;
	}

}
