package com.example.demo.controllers;

import com.example.demo.dtos.LicensePackageCreateDTO;
import com.example.demo.dtos.LicensePackageDTO;
import com.example.demo.services.LicensePackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/license-packages")
@RequiredArgsConstructor
public class LicensePackageController {

    private final LicensePackageService licensePackageService;

    @GetMapping
    public List<LicensePackageDTO> getAll() {
        return licensePackageService.getAllLicensePackages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LicensePackageDTO> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(licensePackageService.getLicensePackageById(id));
    }

    @PostMapping
    public ResponseEntity<LicensePackageDTO> create(@RequestBody LicensePackageCreateDTO dto) {
        return ResponseEntity.ok(licensePackageService.createLicensePackage(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LicensePackageDTO> update(@PathVariable Integer id, @RequestBody LicensePackageCreateDTO dto) {
        return ResponseEntity.ok(licensePackageService.updateLicensePackage(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        licensePackageService.deleteLicensePackage(id);
        return ResponseEntity.noContent().build();
    }
}
