package com.main.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "discounts", schema = "solardb")
public class Discounts {

    @Id
    @Column(name = "id", nullable = false, length = 20)
    private String id;

    @Basic
    @Column(name = "discount_cost", nullable = true, precision = 0)
    private BigDecimal discountCost;

    @Basic
    @Column(name = "quantity", nullable = true)
    private Integer quantity;

    @Basic
    @Column(name = "start_use", nullable = true)
    private LocalDateTime startUse;

    @Basic
    @Column(name = "end_use", nullable = true)
    private LocalDateTime endUse;

    @Basic
    @Column(name = "discount_description", nullable = true, length = 255)
    private String discountDescription;

    @Basic
    @Column(name = "is_active", nullable = true)
    private Boolean isActive;

    @OneToMany(mappedBy = "discountsByDiscountId")
    @JsonManagedReference
    private Collection<Orders> ordersById;
}
