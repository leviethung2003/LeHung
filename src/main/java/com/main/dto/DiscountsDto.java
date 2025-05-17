package com.main.dto;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class DiscountsDto implements Serializable {

    String id;

    BigDecimal discountCost;

    Integer quantity;

    LocalDateTime startUse;

    LocalDateTime endUse;

    String discountDescription;

    Boolean isActive;
}
