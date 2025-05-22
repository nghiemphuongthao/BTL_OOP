package com.example.demo.services;

import com.example.demo.dtos.LicensePackageCreateDTO;
import com.example.demo.dtos.LicensePackageDTO;
import com.example.demo.entities.Admin;
import com.example.demo.entities.Application;
import com.example.demo.entities.LicensePackage;
import com.example.demo.repositories.AdminRepository;
import com.example.demo.repositories.ApplicationRepository;
import com.example.demo.repositories.LicensePackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LicensePackageService {

    private final LicensePackageRepository licensePackageRepository;
    private final AdminRepository adminRepository;
    private final ApplicationRepository applicationRepository;

    public List<LicensePackageDTO> getAllLicensePackages() {
        return licensePackageRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public LicensePackageDTO getLicensePackageById(Integer id) {
        return licensePackageRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("LicensePackage not found with id = " + id));
    }

    public LicensePackageDTO createLicensePackage(LicensePackageCreateDTO dto) {
        LicensePackage lp = new LicensePackage();

        BeanUtils.copyProperties(dto, lp);

        Admin admin = adminRepository.findById(dto.getCreatedByAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found with id = " + dto.getCreatedByAdminId()));
        lp.setCreatedByAdmin(admin);

        Application app = applicationRepository.findById(dto.getApplicationId())
                .orElseThrow(() -> new RuntimeException("Application not found with id = " + dto.getApplicationId()));
        lp.setApplication(app);

        lp.setExpirationMonths(
            dto.getExpirationMonths() == null ? 0 : dto.getExpirationMonths()
        );
        lp.setCode(
            dto.getCode() == null ? "" : dto.getCode()
        );
        lp.setName(
            dto.getName() == null ? "" : dto.getName()
        );

        return convertToDTO(licensePackageRepository.save(lp));
    }

    public LicensePackageDTO updateLicensePackage(Integer id, LicensePackageCreateDTO dto) {
        LicensePackage lp = licensePackageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("LicensePackage not found with id = " + id));

        lp.setCode(dto.getCode());
        lp.setName(dto.getName());
        lp.setExpirationMonths(dto.getExpirationMonths());

        Admin admin = adminRepository.findById(dto.getCreatedByAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found with id = " + dto.getCreatedByAdminId()));
        lp.setCreatedByAdmin(admin);

        Application app = applicationRepository.findById(dto.getApplicationId())
                .orElseThrow(() -> new RuntimeException("Application not found with id = " + dto.getApplicationId()));
        lp.setApplication(app);

        return convertToDTO(licensePackageRepository.save(lp));
    }

    public void deleteLicensePackage(Integer id) {
        if (!licensePackageRepository.existsById(id)) {
            throw new RuntimeException("LicensePackage not found with id = " + id);
        }
        licensePackageRepository.deleteById(id);
    }

    private LicensePackageDTO convertToDTO(LicensePackage lp) {
        LicensePackageDTO dto = new LicensePackageDTO();
        BeanUtils.copyProperties(lp, dto);
        dto.setCreatedByAdminId(lp.getCreatedByAdmin().getAdminId());
        dto.setApplicationId(lp.getApplication().getApplicationId());
        return dto;
    }
}
