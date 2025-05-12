package com.example.demo.controllers;

import com.example.demo.dtos.AdminRolesUpdateRequest;
import com.example.demo.services.AdminRoleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// Định nghĩa đường dẫn gốc cho tất cả các endpoint liên quan đến roles của một
// admin cụ thể
@RequestMapping("/api/admin-role/{adminId}")
@PreAuthorize("@jwtTokenPayload.roleIds.contains(1)")
public class AdminRoleController {

    @Autowired
    private AdminRoleService adminRoleService;

    /**
     * API để lấy danh sách các Role ID của một Admin.
     *
     * @param adminId ID của Admin lấy từ đường dẫn.
     * @return ResponseEntity chứa List<Integer> các Role ID hoặc lỗi 404 nếu Admin
     *         không tồn tại.
     */
    @GetMapping
    public ResponseEntity<List<Integer>> getAdminRoles(@PathVariable Integer adminId) {
        List<Integer> roleIds = adminRoleService.getRoleIdsByAdminId(adminId);
        return ResponseEntity.ok(roleIds);
    }

    /**
     * API để cập nhật (ghi đè) danh sách Role cho một Admin.
     *
     * @param adminId ID của Admin lấy từ đường dẫn.
     * @param request DTO chứa danh sách các Role ID mới từ Request Body.
     * @return ResponseEntity 204 No Content nếu thành công, hoặc lỗi 404/400 nếu có
     *         vấn đề.
     */
    @PutMapping // Sử dụng PUT vì nó mang ý nghĩa thay thế toàn bộ resource (danh sách roles của
                // admin)
    public ResponseEntity<Void> updateAdminRoles(
            @PathVariable Integer adminId,
            @Valid @RequestBody AdminRolesUpdateRequest request) { // Nhận DTO mới

        // Gọi service với adminId từ path và roleIds từ DTO
        adminRoleService.updateRoles(adminId, request.getRoleIds());

        // Trả về 204 No Content khi cập nhật thành công
        return ResponseEntity.ok().build();
    }
}