package com.main.service.impl;

import com.main.entity.ProductImages;
import com.main.repository.ProductImagesRepository;
import com.main.service.ProductImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductImageServiceImpl implements ProductImageService {
    @Autowired
    ProductImagesRepository productImagesRepository;
    @Override
    public List<ProductImages> findAll() {
        return productImagesRepository.findAll();
    }

    @Override
    public void save(ProductImages productImages) {productImagesRepository.save(productImages);
    }
}
