package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Application;
import com.example.demo.entities.LicensePackage;

import java.util.Optional;
import java.util.List; // Import if needed

@Repository
public interface LicensePackageRepository extends JpaRepository<LicensePackage, Integer> {

    // Example: Find package by code
    Optional<LicensePackage> findByCode(String code);

    // Example: Find packages by application
    List<LicensePackage> findByApplication(Application application);

     // Example: Find packages by application ID
    List<LicensePackage> findByApplicationApplicationId(Integer applicationId);

    // Add other custom queries if needed
}