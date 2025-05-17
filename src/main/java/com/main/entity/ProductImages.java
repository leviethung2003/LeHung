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
@Table(name = "product_images", schema = "solardb")
public class ProductImages {

    @Id
    @Column(name = "id", nullable = false, length = 255)
    private String id;

    @Basic
    @Column(name = "product_id", nullable = false, length = 20)
    private String productId;

    @Basic
    @Column(name = "image_path", nullable = false, length = -1)
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference
    private Products productsByProductId;
}
