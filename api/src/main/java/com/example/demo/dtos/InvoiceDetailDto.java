package com.example.demo.dtos;

import lombok.Data;

@Data
public class InvoiceDetailDto {
    private Integer invoiceDetailId;
    private Integer invoiceId;
    private Integer licensePackageId;
    private Integer quantity;
    private Integer licenseId; // Optional nếu đã có License
}
