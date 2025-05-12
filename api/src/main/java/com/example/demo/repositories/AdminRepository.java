package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Admin;

import java.util.Optional;

@Repository // Optional, but good practice
public interface AdminRepository extends JpaRepository<Admin, Integer> {

    // Example custom query method: find an admin by username
    Optional<Admin> findByUsername(String username);

    Optional<Admin> findByAdminId(Integer adminId);

    // You can add more custom query methods based on Admin fields as needed
}