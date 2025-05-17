package com.main.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product_categories", schema = "solardb")
public class ProductCategories {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Basic
    @Column(name = "category_name", nullable = true, length = 50)
    private String categoryName;

    @Basic
    @Column(name = "category_image", nullable = true)
    private String categoryImage;

    @Basic
    @Column(name = "is_active", nullable = true)
    private Boolean isActive;

    @OneToMany(mappedBy = "productCategoriesByCategoryId")
    @JsonManagedReference
    private Collection<ProductTypes> productTypesById;
}
