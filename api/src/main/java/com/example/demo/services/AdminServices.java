package com.example.demo.services;

import java.util.List; // Thêm import
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Thêm import cho @Transactional nếu cần
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.dtos.LoginModelRequest; // Giả sử DTO này đã tồn tại
import com.example.demo.dtos.AdminCreateRequest; // Sử dụng DTO
// import com.example.demo.dtos.AdminPasswordUpdateRequest; // Không cần trực tiếp ở service nếu controller xử lý
import com.example.demo.entities.Admin;
import com.example.demo.utils.jwt.JWTTokenPayload; // Giả sử class này đã tồn tại
import com.example.demo.utils.jwt.JwtResponse; // Giả sử class này đã tồn tại
import com.example.demo.utils.jwt.JwtTokenUtil; // Giả sử class này đã tồn tại
import com.example.demo.repositories.AdminRepository;
import com.example.demo.repositories.AdminRoleRepository; // Giả sử repo này đã tồn tại

@Service
public class AdminServices {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdminRoleRepository adminRoleRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Transactional(readOnly = true) // Đánh dấu là transaction chỉ đọc
    public JwtResponse login(LoginModelRequest loginModelRequest) {
        Admin admin = adminRepository.findByUsername(loginModelRequest.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password"));

        if (!passwordEncoder.matches(loginModelRequest.getPassword(), admin.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }

        admin.setAdminRoles(adminRoleRepository.findByAdmin_AdminId(admin.getAdminId()));

        // Tạo payload và token
        JWTTokenPayload tokenPayload = new JWTTokenPayload(
            admin.getAdminId(),
            admin.getAdminRoles().stream().map(ar -> ar.getRole().getRoleId()).toList() // Lấy Role IDs
        );
        String token = jwtTokenUtil.generateToken(tokenPayload);
        return new JwtResponse(token);
    }

    @Transactional // Đảm bảo tạo admin là một transaction
    public Admin createAdmin(AdminCreateRequest createRequest) { // Nhận DTO thay vì các String riêng lẻ
        if (adminRepository.findByUsername(createRequest.getUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Admin with this username already exists");
        }

        Admin newAdmin = new Admin();
        newAdmin.setUsername(createRequest.getUsername());
        newAdmin.setPassword(passwordEncoder.encode(createRequest.getPassword())); // Mã hóa mật khẩu
        newAdmin.setAdminName(createRequest.getAdminName());
        // Bạn có thể set các giá trị mặc định khác hoặc roles ở đây nếu cần

        return adminRepository.save(newAdmin);
    }

    @Transactional // Đảm bảo cập nhật là một transaction
    public Admin updateAdminPassword(Integer adminId, String newPassword, String currentPassword) {
        Admin existingAdmin = adminRepository.findByAdminId(adminId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found with ID: " + adminId));

        // Xác thực mật khẩu hiện tại
        if (!passwordEncoder.matches(currentPassword, existingAdmin.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect current password");
        }

        // Cập nhật mật khẩu mới đã mã hóa
        existingAdmin.setPassword(passwordEncoder.encode(newPassword));
        return adminRepository.save(existingAdmin);
    }

    @Transactional // Đảm bảo xóa là một transaction
    public void deleteAdmin(Integer adminId) {
        if (!adminRepository.existsById(adminId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found with ID: " + adminId);
        }
        // Cân nhắc xử lý các ràng buộc khóa ngoại trước khi xóa (ví dụ: xóa admin_roles liên quan)
        // Hoặc cấu hình cascade = CascadeType.REMOVE trong Entity nếu muốn xóa tự động
        adminRepository.deleteById(adminId);
    }

    // *** PHƯƠNG THỨC MỚI ***
    @Transactional(readOnly = true)
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // *** PHƯƠNG THỨC MỚI ***
    @Transactional(readOnly = true)
    public Optional<Admin> getAdminById(Integer adminId) {
        return adminRepository.findByAdminId(adminId);
        // Controller sẽ xử lý Optional này
    }
}