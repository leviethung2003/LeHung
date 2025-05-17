package com.main.service;

import com.main.entity.ProductCategories;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductCategoryService {

    List<ProductCategories> findAll();

    List<ProductCategories> findAllTop4(Pageable pageable);

    ProductCategories existsByCategoryName(String categoryName);

    ProductCategories findById(int id);

    ProductCategories save(ProductCategories productCategories);

    void delete(int id);
}
