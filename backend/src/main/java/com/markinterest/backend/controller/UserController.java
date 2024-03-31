package com.markinterest.backend.controller;

import java.security.Key;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.markinterest.backend.model.User;
import com.markinterest.backend.service.UserService;




@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/auth")
public class UserController {
	@Autowired
	UserService user_serv;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(@RequestBody User user) {
		System.out.println(user.toString());
		return user_serv.login(user);
		
	}
	
	@RequestMapping(value = "/getuser", method = RequestMethod.GET)
	public User getUser(@RequestHeader("token") String token) {
//		System.out.println("to controller!!!!!! "+token);
		return user_serv.getUser(token);
	}

}
