package com.markinterest.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.markinterest.backend.model.Pin;
import com.markinterest.backend.model.User;
import com.markinterest.backend.service.PinService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/pin")
public class PinController {
	
	@Autowired
	private PinService pin_serv;
	
	@RequestMapping(value = "/getallpin", method = RequestMethod.GET)
	public List<Pin> getAllPins(@RequestHeader("token") String token){
		return pin_serv.getAllPins(token);
	}
	
	@RequestMapping(value = "/savepin", method = RequestMethod.POST)
	public String savePin(@RequestBody Pin pin, @RequestHeader("token") String token) {
		return pin_serv.savePin(pin, token);
	}
	
	@RequestMapping(value= "/getpin/{category}", method = RequestMethod.GET)
	public List<Pin> getCatPin(@RequestHeader("token") String token, @PathVariable("category") String category) {
		return pin_serv.getCatPin(category, token);
	}
	
	@RequestMapping(value = "/markpin/{value}/{id}")
	public String markPin(@RequestHeader("token") String token, @PathVariable("value") String value, @PathVariable("id") String id) {
		return pin_serv.markPin(value, token, id);
	}
	
	@RequestMapping(value = "/deletepin/{id}", method = RequestMethod.DELETE)
	public String deletePin(@RequestHeader("token") String token, @PathVariable("id") String id) {
		return pin_serv.deletePin(id, token);
	}
	
	@RequestMapping(value = "/getpinid/{id}", method = RequestMethod.GET)
	public Pin getPin(@RequestHeader("token") String token, @PathVariable("id") String id) {
		return pin_serv.getPin(id, token);
	}
	
	@RequestMapping(value = "/addcomment/{id}/{comment}", method = RequestMethod.POST)
	public String addComment(@RequestHeader("token") String token, @PathVariable("id") String id, @PathVariable("comment") String comment) {
		return pin_serv.addComment(id, comment, token);
	}
	
	@RequestMapping(value = "/getsavedpins/{email}", method = RequestMethod.GET)
	public List<Pin> getSavedPins(@RequestHeader("token") String token, @PathVariable("email") String email){
		return pin_serv.getSavedPins(email, token);
	}
	
	@RequestMapping(value = "/getcreatedpins/{email}", method = RequestMethod.GET)
	public List<Pin> getCreatedPins(@RequestHeader("token") String token, @PathVariable("email") String email) {
		return pin_serv.getCreatedPins(email, token);
	}
	
}
