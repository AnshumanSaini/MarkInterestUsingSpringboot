package com.markinterest.backend.model;

import java.util.Arrays;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "pin")
public class Pin {
	
	@Id
    private String id;
	
	public String getId() {
		return id;
	}

	private String name;
	private String about;
	private String destination;
	private String category;
	private String image;
	private String user_id;
	private String postedby;
	private List<String> save;
	private List<String> comments;
	private String comment_name;

	public Pin() {

	}

	public Pin(String name, String about, String destination, String category, String image, String user_id,
			String posted_by, List<String> save, List<String> comments, String comment_name) {
		super();
		this.name = name;
		this.about = about;
		this.destination = destination;
		this.category = category;
		this.image = image;
		this.user_id = user_id;
		this.postedby = postedby;
		this.save = save;
		this.comments = comments;
		this.comment_name = comment_name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getPostedby() {
		return postedby;
	}

	public void setPostedby(String postedby) {
		this.postedby = postedby;
	}

	public List<String> getSave() {
		return save;
	}

	public void setSave(List<String> save) {
		this.save = save;
	}

	public List<String> getComments() {
		return comments;
	}

	public void setComments(List<String> comments) {
		this.comments = comments;
	}

	public String getComment_name() {
		return comment_name;
	}

	@Override
	public String toString() {
		return "Pin [id=" + id + ", name=" + name + ", about=" + about + ", destination=" + destination + ", category="
				+ category + ", image=" + image + ", user_id=" + user_id + ", posted_by=" + postedby + ", save="
				+ save + ", comments=" + comments + ", comment_name=" + comment_name
				+ "]";
	}

	public void setComment_name(String comment_name) {
		this.comment_name = comment_name;
	}

}
