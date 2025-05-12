package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.LoginModelRequest;
import com.example.demo.services.AdminServices;
import com.example.demo.utils.jwt.JwtResponse;

@RestController
@RequestMapping("/api/login") // Đường dẫn gốc cho API admin
public class LoginController {

    @Autowired
    private AdminServices adminServices;

    @PostMapping
    public ResponseEntity<JwtResponse> login(@RequestBody LoginModelRequest loginModelRequest) {
        JwtResponse jwtResponse = adminServices.login(loginModelRequest);
        if (jwtResponse != null) {
            return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
