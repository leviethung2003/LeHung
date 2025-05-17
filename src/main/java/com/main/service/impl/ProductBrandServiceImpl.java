package com.main.service.impl;

import com.main.entity.ProductBrands;
import com.main.repository.ProductBrandRepository;
import com.main.service.ProductBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductBrandServiceImpl implements ProductBrandService {

    @Autowired
    ProductBrandRepository productBrandRepository;

    @Override
    public ProductBrands findByProductBrandId(String productBrandId) {
        return productBrandRepository.getReferenceById(productBrandId);
    }

    @Override
    public void save(ProductBrands productBrands) {
        productBrandRepository.save(productBrands);
    }

    @Override
    public boolean doesProductBrandExist(String id) {
        return productBrandRepository.existsById(id);
    }

    @Override
    public ProductBrands findBandByProductId(String productBrandId) {
        return productBrandRepository.findBandByProductId(productBrandId);
    }

    @Override
    public List<ProductBrands> findAll() {
        return productBrandRepository.findAll();
    }
}
