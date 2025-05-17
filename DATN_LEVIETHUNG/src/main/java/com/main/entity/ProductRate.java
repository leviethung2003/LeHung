package com.main.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "product_rate", schema = "solardb")
public class ProductRate {

    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "product_id", nullable = false, length = 20)
    private String productId;

    @Column(name = "content", nullable = false, length = -1)
    private String content;

    @Column(name = "rate", nullable = true)
    private Integer rate;

    @Column(name = "orderId", nullable = true)
    private String orderId;

    @Column(name = "date_created", nullable = true)
    private Timestamp dateCreated;

    @Column(name = "review_status", nullable = true)
    private Boolean reviewStatus;

    @OneToMany(mappedBy = "productRate")
    @JsonBackReference
    private Collection<ProductRateImage> images;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference
    private Users usersByUserId;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference
    private Products productsByProductId;
}
