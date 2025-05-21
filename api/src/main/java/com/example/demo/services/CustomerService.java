package com.example.demo.services;

import com.example.demo.dtos.CustomerCreateDTO;
import com.example.demo.dtos.CustomerDTO;
import com.example.demo.entities.Admin;
import com.example.demo.entities.Customer;
import com.example.demo.repositories.AdminRepository;
import com.example.demo.repositories.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final AdminRepository adminRepository;

    public List<CustomerDTO> getAllCustomers(String search) {
        if (search != null && !search.isEmpty()) {
            return customerRepository.findByUsernameContainingIgnoreCase(search)
                    .stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        }

        return customerRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // find by username
    public CustomerDTO getCustomerByUsername(String username) {
        return customerRepository.findByUsername(username)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Customer not found with username = " + username));
    }

    public CustomerDTO getCustomerById(Integer id) {
        return customerRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Customer not found with id = " + id));
    }

    public CustomerDTO createCustomer(CustomerCreateDTO dto) {
        Customer customer = new Customer();
        BeanUtils.copyProperties(dto, customer);

        Admin admin = adminRepository.findById(dto.getCreatedByAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found with id = " + dto.getCreatedByAdminId()));

        customer.setCreatedByAdmin(admin);
        customer.setPassword(dto.getPassword());

        return convertToDTO(customerRepository.save(customer));
    }

    public CustomerDTO updateCustomer(Integer id, CustomerCreateDTO dto) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id = " + id));

        customer.setUsername(dto.getUsername());
        customer.setName(dto.getName());
        customer.setPassword(dto.getPassword());

        Admin admin = adminRepository.findById(dto.getCreatedByAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found with id = " + dto.getCreatedByAdminId()));

        customer.setCreatedByAdmin(admin);

        return convertToDTO(customerRepository.save(customer));
    }

    public void deleteCustomer(Integer id) {
        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer not found with id = " + id);
        }
        customerRepository.deleteById(id);
    }

    private CustomerDTO convertToDTO(Customer customer) {
        CustomerDTO dto = new CustomerDTO();
        BeanUtils.copyProperties(customer, dto);
        dto.setCreatedByAdminId(customer.getCreatedByAdmin().getAdminId());
        return dto;
    }
}
