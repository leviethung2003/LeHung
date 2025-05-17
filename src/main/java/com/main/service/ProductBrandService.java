package com.main.service;

import com.main.entity.ProductBrands;

import java.util.List;

public interface ProductBrandService {

    List<ProductBrands> findAll();

    ProductBrands findByProductBrandId(String productBrandId);

    void save(ProductBrands productBrands);

    boolean doesProductBrandExist(String id);

    ProductBrands findBandByProductId(String productBrandId);
}