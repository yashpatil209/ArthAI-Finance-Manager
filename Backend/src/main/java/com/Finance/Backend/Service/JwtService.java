package com.Finance.Backend.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtService {
    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    public JwtService() {
    }

    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap();
        return Jwts.builder().setClaims(claims).setSubject(email).setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis() + 86400000L)).signWith(this.getKey(), SignatureAlgorithm.HS256).compact();
    }

    private Key getKey() {
        byte[] keyBytes = (byte[])Decoders.BASE64.decode("5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437");
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return (String)this.extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return (Date)this.extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = this.extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return (Claims)Jwts.parserBuilder().setSigningKey(this.getKey()).build().parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return this.extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        String username = this.extractUsername(token);
        return username.equals(userDetails.getUsername()) && !this.isTokenExpired(token);
    }
}
