package com.example.demo.utils.jwt;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class JWTTokenPayload {
    private Integer adminId;
    private List<Integer> roleIds;
}