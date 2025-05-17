package com.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class RevenueDto implements Serializable {
    private int month;
    private BigDecimal revenue;
}
