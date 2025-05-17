package com.main.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "carts", schema = "solardb")
public class Carts {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false, length = 20)
    private int id;

    @Basic
    @Column(name = "user_id", nullable = false)
    private int userId;

    @Basic
    @Column(name = "product_id", nullable = false, length = 20)
    private String productId;

    @Basic
    @Column(name = "quantity", nullable = true)
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference
    private Users usersByUserId;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference
    private Products productsByProductId;
}
