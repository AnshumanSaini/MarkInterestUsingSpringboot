package com.markinterest.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class User {
	
	@Id
    private String _id; // MongoDB will automatically populate this field
    
    private String name;
    private String email;
    private String image;

    public User() {
    }

    public User(String name, String email, String image) {
        this.name = name;
        this.email = email;
        this.image = image;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "User [_id=" + _id + ", name=" + name + ", email=" + email + ", image=" + image + "]";
    }

}
