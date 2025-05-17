package com.main.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_items", schema = "solardb")
public class OrderItems {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Basic
    @Column(name = "order_id", nullable = false, length = 20)
    private String orderId;

    @Basic
    @Column(name = "product_id", nullable = false, length = 20)
    private String productId;

    @Basic
    @Column(name = "price", nullable = true, precision = 0)
    private BigDecimal price;

    @Basic
    @Column(name = "quantity", nullable = true)
    private Integer quantity;

    @Basic
    @Column(name = "status-rate", nullable = true)
    private Boolean statusRate;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference
    private Orders ordersByOrderId;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference
    private Products productsByProductId;
}
