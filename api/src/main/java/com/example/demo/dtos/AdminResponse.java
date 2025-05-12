package com.example.demo.dtos;

import com.example.demo.entities.Admin;

import lombok.Data;

@Data
public class AdminResponse {
    private Integer adminId;
    private String username;

    public static AdminResponse FromAdmin(Admin admin){
        AdminResponse adminResponse = new AdminResponse();
        adminResponse.setAdminId(admin.getAdminId());
        adminResponse.setUsername(admin.getUsername());
        return adminResponse;
    }
}