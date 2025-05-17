package com.main.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_discounts", schema = "solardb")
public class UserDiscounts {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "user_id")
    private int userId;

    @Basic
    @Column(name = "discount_id")
    private String discountId;

    @Basic
    @Column(name = "used_at")
    private Timestamp usedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference
    private Users usersByUserId;

    @ManyToOne
    @JoinColumn(name = "discount_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference
    private Discounts discountsByDiscountId;
}
