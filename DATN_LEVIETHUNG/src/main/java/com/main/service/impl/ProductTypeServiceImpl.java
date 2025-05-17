package com.main.service.impl;

import com.main.entity.ProductTypes;
import com.main.repository.ProductTypesRepository;
import com.main.service.ProductTypeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductTypeServiceImpl implements ProductTypeService {

    @Autowired
    ProductTypesRepository repo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<ProductTypes> findAll() {
        return repo.findAll();
    }

    @Override
    public List<ProductTypes> findByCategoryId(int categoryId) {
        return repo.findByCategoryId(categoryId);
    }

    @Override
    public ProductTypes findById(int id) {
        return repo.getReferenceById(id);
    }

    @Override
    public void save(ProductTypes productTypes) {
        repo.save(productTypes);
    }

    @Override
    public void delete(int id) {
        ProductTypes productTypes = repo.getReferenceById(id);
        repo.delete(productTypes);
    }
}