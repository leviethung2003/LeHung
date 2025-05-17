package com.main.service;

import com.main.entity.Products;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<Products> findAll();

    List<Products> findAllByProductId(String productId);

    List<Object[]> findTopProductByCategoryId(int categoryId);

    List<Integer> findPriceProductByUserId(int userId);

    Products findProductByProductId(String productId);

    Optional<Products> findByProductId(String productId);

    void save(Products products);

    boolean doesProductExist(String productId);

    List<Products> findByProductTypeId(int productTypeId);

    List<Products> findByCategoryIdAndProductNameContaining(int categoryId, String productName);

    List<Products> findByCategoryByProductTypeByProducts(int categoryId);

    List<Object[]> findByCategoryIdAndProductTypeId(int categoryId, int productTypeId);

    Products findCloserSale();

    List<Object[]> findAllProductBeingSale();

}
