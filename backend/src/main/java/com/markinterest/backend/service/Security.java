package com.markinterest.backend.service;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class Security {

	


	// this will fetch the user id from the claim
	public String fetchUser(String token, String jwtSecret) {
		try
		{
		Claims claims = this.parseJwtToken(token, jwtSecret);
		return (String) claims.get("sub");
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}

	// this will verify the JWT with the key and secret
	private Claims parseJwtToken(String token, String jwtSecret) {
		try {
//				System.out.println("IN THE CLAIMS");
			Jws<Claims> jwt = Jwts.parserBuilder().setSigningKey(jwtSecret) // Use generated secret key directly
					.build().parseClaimsJws(token);

//			System.out.println("this is the body "+jwt.getBody());
			return jwt.getBody();
		} catch (JwtException e) {
			System.out.println("Error Message: " + e);
			return null;
		}
	}

	@SuppressWarnings("deprecation")
	public String generateJwtToken(String id, int jwtExpirationMs, String jwtSecret) {
//		System.out.println(jwtExpirationMs);
//		System.out.println(jwtSecret);
//		System.out.println(Keys.secretKeyFor(SignatureAlgorithm.HS512));
		String t = Jwts.builder().setSubject(id).setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
		return t;
	}

}
