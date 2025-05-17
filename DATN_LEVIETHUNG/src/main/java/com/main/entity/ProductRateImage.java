package com.main.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "product_images_rate", schema = "solardb")
public class ProductRateImage {

    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Basic
    @Column(name = "product_rate_id", nullable = false)
    private String productRateId;

    @Column(name = "image_path", nullable = false, length = -1)
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "product_rate_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference
    private ProductRate productRate;
}
