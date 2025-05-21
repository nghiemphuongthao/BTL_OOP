package com.example.demo.services;

import com.example.demo.dtos.InvoiceDto;
import com.example.demo.entities.*;
import com.example.demo.repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final AdminRepository adminRepository;
    private final CustomerRepository customerRepository;

    public List<InvoiceDto> getAll() {
        return invoiceRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public InvoiceDto getById(Integer id) {
        return invoiceRepository.findById(id).map(this::toDto).orElse(null);
    }

    public InvoiceDto create(InvoiceDto dto) {
        Invoice invoice = new Invoice();
        invoice.setCreatedByAdmin(adminRepository.findById(dto.getCreatedByAdminId()).orElseThrow());
        invoice.setCustomer(customerRepository.findById(dto.getCustomerId()).orElseThrow());
        invoice.setStatus(dto.getStatus());
        return toDto(invoiceRepository.save(invoice));
    }

    public InvoiceDto update(Integer id, InvoiceDto dto) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow();
        invoice.setStatus(dto.getStatus());
        return toDto(invoiceRepository.save(invoice));
    }

    public void delete(Integer id) {
        invoiceRepository.deleteById(id);
    }

    private InvoiceDto toDto(Invoice entity) {
        InvoiceDto dto = new InvoiceDto();
        dto.setInvoiceId(entity.getInvoiceId());
        dto.setCreatedByAdminId(entity.getCreatedByAdmin().getAdminId());
        dto.setCustomerId(entity.getCustomer().getCustomerId());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setStatus(entity.getStatus());
        dto.setInvoiceDetailIds(
            entity.getInvoiceDetails().stream().map(InvoiceDetail::getInvoiceDetailId).collect(Collectors.toList())
        );
        return dto;
    }
}
