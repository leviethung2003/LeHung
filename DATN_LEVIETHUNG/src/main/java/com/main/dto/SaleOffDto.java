package com.main.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.main.entity.Products;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SaleOffDto {


    private int id;

    @NotNull(message = "Tên sản phẩm không được trống")
    private String productId;

    private BigDecimal saleValue;

    @NotNull(message = "Ngày bắt đầu không được trống")
    private LocalDateTime startUse;

    @NotNull(message = "Ngày kết thúc không được trống")
    private LocalDateTime endUse;

    private Boolean isActive;
}
