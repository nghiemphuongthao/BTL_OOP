package com.example.demo.controllers;

import com.example.demo.dtos.LicenseCreateDTO;
import com.example.demo.dtos.LicenseDTO;
import com.example.demo.services.LicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/licenses")
@RequiredArgsConstructor
public class LicenseController {

    private final LicenseService licenseService;

    @GetMapping
    public List<LicenseDTO> getAllLicenses() {
        return licenseService.getAllLicenses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LicenseDTO> getLicense(@PathVariable Integer id) {
        return ResponseEntity.ok(licenseService.getLicenseById(id));
    }

    @PostMapping
    public ResponseEntity<LicenseDTO> createLicense(@RequestBody LicenseCreateDTO dto) {
        return ResponseEntity.ok(licenseService.createLicense(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LicenseDTO> updateLicense(@PathVariable Integer id, @RequestBody LicenseCreateDTO dto) {
        return ResponseEntity.ok(licenseService.updateLicense(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLicense(@PathVariable Integer id) {
        licenseService.deleteLicense(id);
        return ResponseEntity.noContent().build();
    }
}
