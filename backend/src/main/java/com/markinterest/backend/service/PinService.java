package com.markinterest.backend.service;

import java.awt.SystemColor;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.markinterest.backend.model.Pin;
import com.markinterest.backend.repository.PinRepository;

@Service
public class PinService {
	
	@Value("${jwt.secret}")
	private String jwtSecret;
	
	@Autowired
	private PinRepository pin_repo;
	
	private Security sec = new Security();
	public List<Pin> getAllPins(String token) {
		try {
			if(sec.fetchUser(token, jwtSecret)==null) throw new NullPointerException();
			return pin_repo.findAll();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}
	
	public String savePin(Pin pin, String token) {
		try {
			if(sec.fetchUser(token, jwtSecret)==null) throw new NullPointerException();
			pin_repo.save(pin);
			return "Pin Saved Successfully...";
		}
		catch(Exception e){
			e.printStackTrace();
			return "Error Occured!!!";
		}
	}
	
	public List<Pin> getCatPin(String category, String token) {
		try {
			if(sec.fetchUser(token, jwtSecret)==null) throw new NullPointerException();
			return pin_repo.findByCategory(category);
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public String markPin(String value, String token, String id) {
		try {
			if(sec.fetchUser(token, jwtSecret)==null) throw new NullPointerException();
			Optional<Pin> document = pin_repo.findById(id);
			if(document.isPresent()) {
				Pin pin = document.get();
				pin.getSave().add(value);
				pin_repo.save(pin);
				return "Value added successfully";
			}
			else return "Error adding value!!!";
			
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public String deletePin(String id, String token) {
		try {
			if(sec.fetchUser(token, jwtSecret)==null) throw new NullPointerException();
			Optional<Pin> document = pin_repo.findById(id);
			if(document.isPresent()) {
				pin_repo.deleteById(id);
				return "Value deleted successfully";
			}
			else return "Error deleting value";
		}
		catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	public Pin getPin(String id, String token) {
		try {
			if(sec.fetchUser(token, jwtSecret)==null) throw new NullPointerException();
			Optional<Pin> document = pin_repo.findById(id);
			if(document.isPresent()) {
				return document.get();
			}
			else throw new NullPointerException();
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public String addComment(String id, String comment, String token) {
		try {
//			System.out.println(id+" "+comment);
			if(sec.fetchUser(token, jwtSecret)==null) throw new NullPointerException();
			Optional<Pin> document = pin_repo.findById(id);
			if(document.isPresent()) {
				Pin pin = document.get();
				pin.getComments().add(comment);
				pin_repo.save(pin);
				return "Value added successfully";
			}
			else return "Error adding value!!!";
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public List<Pin> getSavedPins(String email, String token){
		try {
			if(sec.fetchUser(token, jwtSecret)==null) throw new NullPointerException();
			return pin_repo.findBySave(email);
			
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public List<Pin> getCreatedPins(String email, String token) {
		try {
			if(sec.fetchUser(token, jwtSecret)==null) throw new NullPointerException();
			return pin_repo.findByPostedby(email);
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
