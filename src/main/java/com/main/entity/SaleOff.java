package com.main.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sale_off", schema = "solardb")
public class SaleOff {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "product_id")
    private String productId;

    @Basic
    @Column(name = "sale_value")
    private BigDecimal saleValue;

    @Basic
    @Column(name = "start_use")
    private LocalDateTime startUse;

    @Basic
    @Column(name = "end_use")
    private LocalDateTime endUse;

    @Basic
    @Column(name = "is_active")
    private Boolean isActive;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference
    private Products productsByProductId;
}
