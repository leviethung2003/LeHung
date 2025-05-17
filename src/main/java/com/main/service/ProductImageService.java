package com.main.service;

import com.main.entity.ProductImages;

import java.util.List;

public interface ProductImageService {
    List<ProductImages> findAll();
    void save(ProductImages productImages);
}
