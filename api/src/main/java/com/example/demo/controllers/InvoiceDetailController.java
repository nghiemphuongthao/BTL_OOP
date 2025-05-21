package com.example.demo.controllers;

import com.example.demo.dtos.InvoiceDetailDto;
import com.example.demo.services.InvoiceDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoice-details")
@RequiredArgsConstructor
public class InvoiceDetailController {

    private final InvoiceDetailService service;

    @GetMapping
    public List<InvoiceDetailDto> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public InvoiceDetailDto getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public InvoiceDetailDto create(@RequestBody InvoiceDetailDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public InvoiceDetailDto update(@PathVariable Integer id, @RequestBody InvoiceDetailDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
