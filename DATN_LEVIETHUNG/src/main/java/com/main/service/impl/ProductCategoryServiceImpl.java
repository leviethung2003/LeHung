package com.main.service.impl;

import com.main.entity.ProductCategories;
import com.main.repository.ProductCategoriesRepository;
import com.main.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

    @Autowired
    ProductCategoriesRepository repo;

    @Override
    public List<ProductCategories> findAll() {
        return repo.findAll();
    }

    @Override
    public List<ProductCategories> findAllTop4(Pageable pageable) {
        return repo.findTop4Categories(pageable);
    }

    @Override
    public ProductCategories existsByCategoryName(String categoryName) {
        return repo.findByCategoryName(categoryName);
    }

    @Override
    public ProductCategories findById(int id) {
        return repo.getReferenceById(id);
    }

    @Override
    public ProductCategories save(ProductCategories productCategories) {
        return repo.save(productCategories);
    }

    @Override
    public void delete(int id) {
        ProductCategories categories = findById(id);
        categories.setIsActive(Boolean.FALSE);
        repo.save(categories);
    }
}