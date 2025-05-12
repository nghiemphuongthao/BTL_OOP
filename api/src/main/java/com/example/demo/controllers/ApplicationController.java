package com.example.demo.controllers;

import com.example.demo.dtos.ApplicationCreatingRequest;
import com.example.demo.entities.Admin;
import com.example.demo.entities.Application;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.services.ApplicationService;
import com.example.demo.utils.jwt.JWTTokenPayload;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/application")
@PreAuthorize("@jwtTokenPayload.roleIds.contains(2)")
public class ApplicationController {

    private final ApplicationService applicationService;

    @Autowired
    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Integer id) {
        var responseData = applicationService.getApplicationById(id);
        if (responseData == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(responseData.get());
    }

    @PostMapping
    public ResponseEntity<Application> createApplication(
            @Valid @RequestBody ApplicationCreatingRequest applicationCreatingRequest,
            @AuthenticationPrincipal JWTTokenPayload payload) {
        var application = new Application();
        var admin = new Admin();
        admin.setAdminId(payload.getAdminId());

        application.setName(applicationCreatingRequest.getName());
        application.setCreatedByAdmin(admin);
        return new ResponseEntity<>(applicationService.createApplication(application), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable Integer id,
            @Valid @RequestBody Application applicationDetails) {
        try {
            return ResponseEntity.ok(applicationService.updateApplication(id, applicationDetails));
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Integer id) {
        applicationService.deleteApplication(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}