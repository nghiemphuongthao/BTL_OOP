package com.example.demo.services;

import com.example.demo.dtos.InvoiceDetailDto;
import com.example.demo.entities.*;
import com.example.demo.repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceDetailService {

    private final InvoiceDetailRepository invoiceDetailRepository;
    private final InvoiceRepository invoiceRepository;
    private final LicensePackageRepository licensePackageRepository;

    public List<InvoiceDetailDto> getAll() {
        return invoiceDetailRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public InvoiceDetailDto getById(Integer id) {
        return invoiceDetailRepository.findById(id).map(this::toDto).orElse(null);
    }

    public InvoiceDetailDto create(InvoiceDetailDto dto) {
        InvoiceDetail detail = new InvoiceDetail();
        detail.setInvoice(invoiceRepository.findById(dto.getInvoiceId()).orElseThrow());
        detail.setLicensePackage(licensePackageRepository.findById(dto.getLicensePackageId()).orElseThrow());
        detail.setQuantity(dto.getQuantity());
        return toDto(invoiceDetailRepository.save(detail));
    }

    public InvoiceDetailDto update(Integer id, InvoiceDetailDto dto) {
        InvoiceDetail detail = invoiceDetailRepository.findById(id).orElseThrow();
        detail.setQuantity(dto.getQuantity());
        return toDto(invoiceDetailRepository.save(detail));
    }

    public void delete(Integer id) {
        invoiceDetailRepository.deleteById(id);
    }

    private InvoiceDetailDto toDto(InvoiceDetail detail) {
        InvoiceDetailDto dto = new InvoiceDetailDto();
        dto.setInvoiceDetailId(detail.getInvoiceDetailId());
        dto.setInvoiceId(detail.getInvoice().getInvoiceId());
        dto.setLicensePackageId(detail.getLicensePackage().getLicensePackageId());
        dto.setQuantity(detail.getQuantity());
        if (detail.getLicense() != null) {
            dto.setLicenseId(detail.getLicense().getLicenseId());
        }
        return dto;
    }
}
