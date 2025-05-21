package com.example.demo.dtos;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class CustomerDTO {
    private Integer customerId;
    private String username;
    private String name;
    private Integer createdByAdminId;
    private Timestamp createdAt;
}
