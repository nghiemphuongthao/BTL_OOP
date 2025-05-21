package com.example.demo.services;

import com.example.demo.dtos.LicenseCreateDTO;
import com.example.demo.dtos.LicenseDTO;
import com.example.demo.entities.Admin;
import com.example.demo.entities.InvoiceDetail;
import com.example.demo.entities.License;
import com.example.demo.repositories.AdminRepository;
import com.example.demo.repositories.InvoiceDetailRepository;
import com.example.demo.repositories.LicenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LicenseService {

    private final LicenseRepository licenseRepository;
    private final AdminRepository adminRepository;
    private final InvoiceDetailRepository invoiceDetailRepository;

    public List<LicenseDTO> getAllLicenses() {
        return licenseRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public LicenseDTO getLicenseById(Integer id) {
        License license = licenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("License not found with id = " + id));
        return convertToDTO(license);
    }

    public LicenseDTO createLicense(LicenseCreateDTO dto) {
        License license = new License();

        Admin admin = adminRepository.findById(dto.getCreatedByAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found with id = " + dto.getCreatedByAdminId()));

        InvoiceDetail invoiceDetail = invoiceDetailRepository.findById(dto.getInvoiceDetailId())
                .orElseThrow(() -> new RuntimeException("InvoiceDetail not found with id = " + dto.getInvoiceDetailId()));

        license.setActiveAt(dto.getActiveAt());
        license.setExpiresAt(dto.getExpiresAt());
        license.setLicenseCode(dto.getLicenseCode());
        license.setStatus(dto.getStatus());
        license.setCreatedByAdmin(admin);
        license.setInvoiceDetail(invoiceDetail); // also sets licenseId

        return convertToDTO(licenseRepository.save(license));
    }

    public LicenseDTO updateLicense(Integer id, LicenseCreateDTO dto) {
        License license = licenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("License not found with id = " + id));

        Admin admin = adminRepository.findById(dto.getCreatedByAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found with id = " + dto.getCreatedByAdminId()));

        license.setActiveAt(dto.getActiveAt());
        license.setExpiresAt(dto.getExpiresAt());
        license.setLicenseCode(dto.getLicenseCode());
        license.setStatus(dto.getStatus());
        license.setCreatedByAdmin(admin);
        // Không cập nhật invoiceDetailId vì là MapsId

        return convertToDTO(licenseRepository.save(license));
    }

    public void deleteLicense(Integer id) {
        if (!licenseRepository.existsById(id)) {
            throw new RuntimeException("License not found with id = " + id);
        }
        licenseRepository.deleteById(id);
    }

    private LicenseDTO convertToDTO(License license) {
        LicenseDTO dto = new LicenseDTO();
        BeanUtils.copyProperties(license, dto);
        dto.setCreatedByAdminId(license.getCreatedByAdmin().getAdminId());
        dto.setInvoiceDetailId(license.getInvoiceDetail().getInvoiceDetailId());
        return dto;
    }
}
