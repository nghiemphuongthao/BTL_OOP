package com.example.demo.dtos;

import lombok.Data;

@Data
public class CustomerCreateDTO {
    private String username;
    private String password;
    private String name;
    private Integer createdByAdminId;
}
