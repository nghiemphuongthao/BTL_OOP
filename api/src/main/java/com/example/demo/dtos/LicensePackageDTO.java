package com.example.demo.dtos;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class LicensePackageDTO {
    private Integer licensePackageId;
    private String code;
    private String name;
    private Integer expirationMonths;
    private Integer createdByAdminId;
    private Integer applicationId;
    private Timestamp createdAt;
}
