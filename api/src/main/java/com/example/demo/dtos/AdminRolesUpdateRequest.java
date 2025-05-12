package com.example.demo.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AdminRolesUpdateRequest {

    // Đảm bảo danh sách không null và không rỗng
    @NotEmpty(message = "Role IDs list cannot be empty.")
    private List<@NotNull(message = "Role ID cannot be null") Integer> roleIds;
}