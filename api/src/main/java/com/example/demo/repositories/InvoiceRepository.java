package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Invoice;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {

    // Example: Find invoices by customer
    List<Invoice> findByCustomer(Customer customer);

    // Example: Find invoices by customer ID
    List<Invoice> findByCustomerCustomerId(Integer customerId);

    // Example: Find invoices by status
    List<Invoice> findByStatus(Integer status);

    // Add other custom queries if needed
}