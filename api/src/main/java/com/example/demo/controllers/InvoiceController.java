package com.example.demo.controllers;

import com.example.demo.dtos.InvoiceDto;
import com.example.demo.services.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @GetMapping
    public List<InvoiceDto> getAll() {
        return invoiceService.getAll();
    }

    @GetMapping("/{id}")
    public InvoiceDto getById(@PathVariable Integer id) {
        return invoiceService.getById(id);
    }

    @PostMapping
    public InvoiceDto create(@RequestBody InvoiceDto dto) {
        return invoiceService.create(dto);
    }

    @PutMapping("/{id}")
    public InvoiceDto update(@PathVariable Integer id, @RequestBody InvoiceDto dto) {
        return invoiceService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        invoiceService.delete(id);
    }
}
