package com.main.service.impl;

import com.main.entity.ProductRate;
import com.main.repository.ProductRateRepository;
import com.main.service.ProductRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductRateServiceImpl implements ProductRateService {

    @Autowired
    ProductRateRepository productRateRepository;

    @Override
    public List<ProductRate> findAll() {
        return productRateRepository.findAll();
    }

    @Override
    public boolean existsById(String id) {
        return productRateRepository.existsById(id);
    }

    @Override
    public List<ProductRate> findAllRateByProductId(String productId) {
        return productRateRepository.findByProductId(productId);
    }

    @Override
    public void saveProductRate(ProductRate productRate) {
        productRateRepository.save(productRate);
    }

    @Override
    public Optional<ProductRate> findById(String id) {
        return productRateRepository.findById(id);
    }

}
