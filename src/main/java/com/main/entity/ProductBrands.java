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
@Table(name = "product_brands", schema = "solardb")
public class ProductBrands {
    @Id
    @Column(name = "id", nullable = false, length = 20)
    private String id;

    @Basic
    @Column(name = "brand_name", nullable = false, length = 255)
    private String brandName;

    @Basic
    @Column(name = "country_of_origin", nullable = true, length = 100)
    private String countryOfOrigin;

    @Basic
    @Column(name = "brand_description", nullable = true, length = -1)
    private String brandDescription;

    @Basic
    @Column(name = "website_url", nullable = true, length = 255)
    private String websiteUrl;

    @Basic
    @Column(name = "brand_phone_number", nullable = true, length = 13)
    private String brandPhoneNumber;

    @Basic
    @Column(name = "is_status_delete", nullable = true, length = 255)
    private String isStatusDelete;

    @OneToMany(mappedBy = "productBrandsByProductBrandId")
    @JsonManagedReference
    private Collection<Products> productsById;
}
