package com.example.demo.dtos;

import lombok.Data;

@Data
public class LicensePackageCreateDTO {
    private String code;
    private String name;
    private Integer expirationMonths;
    private Integer createdByAdminId;
    private Integer applicationId;
}
