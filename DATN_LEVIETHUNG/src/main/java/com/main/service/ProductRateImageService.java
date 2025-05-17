package com.main.service;

import com.main.entity.ProductRateImage;

import java.util.List;

public interface ProductRateImageService {
    List<ProductRateImage> findByIdRate(String rateId);
    void saveImageRateProduct(ProductRateImage productRateImage);
}
