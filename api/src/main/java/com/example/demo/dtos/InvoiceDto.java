package com.example.demo.dtos;

import lombok.Data;
import java.sql.Timestamp;
import java.util.List;

@Data
public class InvoiceDto {
    private Integer invoiceId;
    private Integer createdByAdminId;
    private Integer customerId;
    private Timestamp createdAt;
    private Integer status;
    private List<Integer> invoiceDetailIds; // Chứa ID của các InvoiceDetail
}
