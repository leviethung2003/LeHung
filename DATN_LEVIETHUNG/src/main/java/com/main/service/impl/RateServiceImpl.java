package com.main.service.impl;

import com.main.entity.ProductRate;
import com.main.repository.ProductRateRepository;
import com.main.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RateServiceImpl implements RateService {

    @Autowired
    ProductRateRepository repo;

    @Override
    public List<ProductRate> findAll() {
        return repo.findAll();
    }
}
