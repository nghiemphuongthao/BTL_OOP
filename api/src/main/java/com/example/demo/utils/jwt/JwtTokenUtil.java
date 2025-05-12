package com.example.demo.utils.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class JwtTokenUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration; // in seconds

    public String generateToken(JWTTokenPayload payload) {
        Algorithm algorithm = Algorithm.HMAC512(secret);
        return JWT.create()
                .withClaim("adminId", payload.getAdminId())
                .withClaim("roleIds", payload.getRoleIds())
                .withExpiresAt(new Date(System.currentTimeMillis() + expiration * 1000))
                .sign(algorithm);
    }

    public JWTTokenPayload getPayloadFromToken(String token) {
        DecodedJWT decodedJWT = verifyToken(token);
        Integer adminId = decodedJWT.getClaim("adminId").asInt();
        List<Integer> roleIds = decodedJWT.getClaim("roleIds").asList(Integer.class);
        return new JWTTokenPayload(adminId, roleIds);
    }

    public boolean validateToken(String token) {
        try {
            verifyToken(token);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    private DecodedJWT verifyToken(String token) {
        Algorithm algorithm = Algorithm.HMAC512(secret);
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(token);
    }
}
