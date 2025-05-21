package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Customer;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    List<Customer> findByUsernameContainingIgnoreCase(String name);
    List<Customer> findByNameContainingIgnoreCase(String name);

    // Example: Find customer by username
    Optional<Customer> findByUsername(String username);

    // Add other custom queries if needed
}