package com.main.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "product_types", schema = "solardb")
public class ProductTypes {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Basic
    @Column(name = "category_id", nullable = false)
    private int categoryId;

    @Basic
    @Column(name = "product_type_name", nullable = false, length = 50)
    private String productTypeName;

    @Basic
    @Column(name = "is_active", nullable = true)
    private Boolean isActive;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference
    private ProductCategories productCategoriesByCategoryId;

    @OneToMany(mappedBy = "productTypesByProductTypeId")
    @JsonManagedReference
    private Collection<Products> productsById;
}
