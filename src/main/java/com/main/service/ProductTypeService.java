package com.main.service;

import com.main.entity.ProductTypes;

import java.util.List;

public interface ProductTypeService {

    List<ProductTypes> findAll();

    List<ProductTypes> findByCategoryId(int categoryId);

    ProductTypes findById(int id);

    void save(ProductTypes productTypes);

    void delete(int id);
}