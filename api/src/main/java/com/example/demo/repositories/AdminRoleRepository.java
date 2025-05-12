package com.example.demo.repositories;

import com.example.demo.entities.AdminRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface AdminRoleRepository extends JpaRepository<AdminRole, Integer> {

    // Tìm tất cả AdminRole theo adminId để lấy ra roleId
    Set<AdminRole> findByAdmin_AdminId(Integer adminId);

    // Xóa tất cả AdminRole theo adminId (dùng trong update)
    void deleteByAdmin_AdminId(Integer adminId);

    // Không cần các phương thức khác cho yêu cầu này
}