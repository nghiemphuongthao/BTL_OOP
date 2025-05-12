package com.example.demo.controllers;

import com.example.demo.dtos.AdminCreateRequest;
import com.example.demo.dtos.AdminPasswordUpdateRequest;
import com.example.demo.dtos.AdminResponse;
import com.example.demo.entities.Admin;
import com.example.demo.services.AdminServices;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin") // Đường dẫn gốc cho API admin
@PreAuthorize("@jwtTokenPayload.roleIds.contains(1)")
public class AdminController {

    @Autowired
    private AdminServices adminServices;

    // Endpoint tạo Admin mới
    @PostMapping
    public ResponseEntity<AdminResponse> createAdmin(@Valid @RequestBody AdminCreateRequest createRequest) {
        Admin createdAdmin = adminServices.createAdmin(createRequest);
        // *** THAY ĐỔI Ở ĐÂY: Sử dụng phương thức tĩnh FromAdmin ***
        return new ResponseEntity<>(AdminResponse.FromAdmin(createdAdmin), HttpStatus.CREATED);
    }

    // Endpoint lấy danh sách tất cả Admin
    @GetMapping
    public ResponseEntity<List<AdminResponse>> getAllAdmins() {
        List<Admin> admins = adminServices.getAllAdmins();
        // *** THAY ĐỔI Ở ĐÂY: Sử dụng method reference đến phương thức tĩnh FromAdmin ***
        List<AdminResponse> adminResponses = admins.stream()
                .map(AdminResponse::FromAdmin) // Sử dụng method reference
                .collect(Collectors.toList());
        return ResponseEntity.ok(adminResponses);
    }

    // Endpoint cập nhật mật khẩu Admin
    @PatchMapping("/{id}/password")
    public ResponseEntity<AdminResponse> updateAdminPassword(
            @PathVariable Integer id,
            @Valid @RequestBody AdminPasswordUpdateRequest passwordUpdateRequest) {
        Admin updatedAdmin = adminServices.updateAdminPassword(
                id,
                passwordUpdateRequest.getNewPassword(),
                passwordUpdateRequest.getCurrentPassword()
        );
        // *** THAY ĐỔI Ở ĐÂY: Sử dụng phương thức tĩnh FromAdmin ***
        return ResponseEntity.ok(AdminResponse.FromAdmin(updatedAdmin));
        // Hoặc trả về ResponseEntity.noContent().build(); nếu không cần trả về thông tin
    }

    // Endpoint xóa Admin theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Integer id) {
        adminServices.deleteAdmin(id);
        return ResponseEntity.noContent().build(); // Trả về 204 No Content khi xóa thành công
    }
}