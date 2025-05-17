package com.main.service.impl;

import com.main.entity.ProductRateImage;
import com.main.repository.ProductRateImageRepository;
import com.main.service.ProductRateImageService;
import com.main.service.ProductRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductRateImageServiceImpl implements ProductRateImageService {
    @Autowired
    ProductRateImageRepository productRateImageRepository;

    @Override
    public List<ProductRateImage> findByIdRate(String rateId) {
        return productRateImageRepository.findByProductRateId(rateId);
    }

    @Override
    public void saveImageRateProduct(ProductRateImage productRateImage) {
        productRateImageRepository.save(productRateImage);
    }
}
