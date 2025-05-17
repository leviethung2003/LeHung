package com.main.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products", schema = "solardb")
public class Products {

    @Id
    @Column(name = "id", nullable = false, length = 20)
    private String id;

    @Basic
    @Column(name = "product_type_id", nullable = true)
    private Integer productTypeId;

    @Basic
    @Column(name = "product_brand_id", nullable = true, length = 20)
    private String productBrandId;

    @Basic
    @Column(name = "product_name", nullable = true, length = 100)
    private String productName;

    @Basic
    @Column(name = "price", nullable = true, precision = 0)
    private BigDecimal price;

    @Basic
    @Column(name = "quantity", nullable = true)
    private Integer quantity;

    @Basic
    @Column(name = "descriptions", nullable = true, length = -1)
    private String descriptions;

    @Basic
    @Column(name = "template_description", nullable = true, length = -1)
    private String templateDescription;

    @Basic
    @Column(name = "powers", nullable = true, length = 255)
    private String powers;

    @Basic
    @Column(name = "warranty", nullable = true)
    private String warranty;

    @Basic
    @Column(name = "is_status_delete", nullable = true, length = 255)
    private String isStatusDelete;

    @Basic
    @Column(name = "date_created", nullable = true)
    private Timestamp dateCreated;

    @OneToMany(mappedBy = "productsByProductId")
    @JsonManagedReference
    private Collection<Carts> cartsById;

    @OneToMany(mappedBy = "productsByProductId")
    @JsonManagedReference
    private Collection<OrderItems> orderItemsById;

    @OneToMany(mappedBy = "productsByProductId")
    @JsonManagedReference
    private Collection<ProductImages> productImagesById;

    @OneToMany(mappedBy = "productsByProductId")
    @JsonManagedReference
    private Collection<SaleOff> productSaleOffById;

    @OneToMany(mappedBy = "productsByProductId")
    @JsonManagedReference
    private Collection<ProductRate> productRatesById;

    @ManyToOne
    @JoinColumn(name = "product_type_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonBackReference
    private ProductTypes productTypesByProductTypeId;

    @ManyToOne
    @JoinColumn(name = "product_brand_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonBackReference
    private ProductBrands productBrandsByProductBrandId;
}
