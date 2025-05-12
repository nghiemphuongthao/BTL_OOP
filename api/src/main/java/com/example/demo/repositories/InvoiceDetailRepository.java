package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Invoice;
import com.example.demo.entities.InvoiceDetail;
import com.example.demo.entities.LicensePackage;

import java.util.List;

@Repository
public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, Integer> {

    // Example: Find details by invoice
    List<InvoiceDetail> findByInvoice(Invoice invoice);

    // Example: Find details by invoice ID
    List<InvoiceDetail> findByInvoiceInvoiceId(Integer invoiceId);

    // Example: Find details by license package
    List<InvoiceDetail> findByLicensePackage(LicensePackage licensePackage);

    // Example: Find details by license package ID
    List<InvoiceDetail> findByLicensePackageLicensePackageId(Integer licensePackageId);

    // Add other custom queries if needed
}