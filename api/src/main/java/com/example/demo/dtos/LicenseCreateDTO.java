package com.example.demo.dtos;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class LicenseCreateDTO {
    private Timestamp activeAt;
    private Timestamp expiresAt;
    private String licenseCode;
    private Integer status;
    private Integer createdByAdminId;
    private Integer invoiceDetailId; // because licenseId is mapped from this
}
