package com.example.demo.services;

// ... các import khác giữ nguyên ...
import com.example.demo.dtos.AdminRolesUpdateRequest; // Không cần nữa nếu dùng List<Integer>
import com.example.demo.entities.Admin;
import com.example.demo.entities.AdminRole;
import com.example.demo.entities.Role;
import com.example.demo.repositories.AdminRepository;
import com.example.demo.repositories.AdminRoleRepository;
import com.example.demo.repositories.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException; // Có thể dùng thay EntityNotFoundException
import org.springframework.http.HttpStatus; // Import HttpStatus

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AdminRoleService {

    @Autowired
    private AdminRoleRepository adminRoleRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private RoleRepository roleRepository;

    /**
     * Lấy danh sách các Role ID được gán cho một Admin cụ thể.
     */
    @Transactional(readOnly = true) // Thêm readOnly cho transaction đọc
    public List<Integer> getRoleIdsByAdminId(Integer adminId) {
        // Kiểm tra admin có tồn tại không
        if (!adminRepository.existsById(adminId)) {
            // Sử dụng ResponseStatusException để Controller dễ xử lý hơn
             throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found with ID: " + adminId);
            // Hoặc giữ EntityNotFoundException nếu bạn có ExceptionHandler riêng
            // throw new EntityNotFoundException("Admin not found with ID: " + adminId);
        }

        Set<AdminRole> adminRoles = adminRoleRepository.findByAdmin_AdminId(adminId);

        return adminRoles.stream()
                .map(adminRole -> adminRole.getRole().getRoleId())
                .collect(Collectors.toList());
    }

    /**
     * Cập nhật (ghi đè) danh sách các Role cho một Admin.
     *
     * @param adminId ID của Admin cần cập nhật roles (từ PathVariable).
     * @param roleIds Danh sách các Role ID mới sẽ được gán (từ RequestBody).
     */
    @Transactional // Bắt buộc phải có Transactional
    public void updateRoles(Integer adminId, List<Integer> roleIds) { // *** THAY ĐỔI SIGNATURE ***

        // 1. Kiểm tra Admin tồn tại
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found with ID: " + adminId));
                // .orElseThrow(() -> new EntityNotFoundException("Admin not found with ID: " + adminId));

        // 2. Xóa tất cả các AdminRole cũ của admin này
        // Lưu ý: Tùy vào cấu hình Cascade và FetchType, việc xóa trực tiếp
        // các bản ghi AdminRole có thể hiệu quả hơn là thao tác qua Set trong Admin entity.
        // Phương thức deleteByAdmin_AdminId là một cách tiếp cận phổ biến.
        adminRoleRepository.deleteByAdmin_AdminId(adminId);
        adminRoleRepository.flush(); // Đảm bảo việc xóa được thực thi trước khi thêm mới trong cùng transaction

        // 3. Chuẩn bị thêm các AdminRole mới (nếu roleIds không rỗng)
        if (roleIds != null && !roleIds.isEmpty()) {
            Set<Integer> uniqueRoleIds = new HashSet<>(roleIds); // Loại bỏ trùng lặp
            List<AdminRole> newAdminRoles = new ArrayList<>();

            for (Integer roleId : uniqueRoleIds) {
                // Kiểm tra từng Role tồn tại
                Role role = roleRepository.findById(roleId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Role not found with ID: " + roleId));
                        // .orElseThrow(() -> new EntityNotFoundException("Role not found with ID: " + roleId + " during update for admin ID: " + adminId));

                // Tạo bản ghi AdminRole mới
                AdminRole newAdminRole = new AdminRole();
                newAdminRole.setAdmin(admin);
                newAdminRole.setRole(role);
                newAdminRoles.add(newAdminRole);
            }

             // 4. Lưu tất cả các bản ghi mới vào DB
             if (!newAdminRoles.isEmpty()) {
                adminRoleRepository.saveAll(newAdminRoles);
             }
        }
        // Không cần trả về gì
    }
}