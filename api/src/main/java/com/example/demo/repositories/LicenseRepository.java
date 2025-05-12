package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.License;

import java.util.Optional;
import java.sql.Timestamp; // Import if needed for timestamp queries
import java.util.List; // Import if needed


@Repository
public interface LicenseRepository extends JpaRepository<License, Integer> { // ID is Integer

    // Example: Find license by its unique code
    Optional<License> findByLicenseCode(String licenseCode);

    // Example: Find licenses by status
    List<License> findByStatus(Integer status);

    // Example: Find licenses expiring before a certain date
    List<License> findByExpiresAtBefore(Timestamp expiryDate);

     // Example: Find license by its associated InvoiceDetail ID (which is the same as License ID)
    Optional<License> findByInvoiceDetailInvoiceDetailId(Integer invoiceDetailId);

    // Add other custom queries if needed
}