package com.main.repository;

import com.main.entity.ProductCategories;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductCategoriesRepository extends JpaRepository<ProductCategories, Integer> {

    @Query("SELECT c FROM ProductCategories c")
    List<ProductCategories> findTop4Categories(Pageable pageable);

    ProductCategories findByCategoryName(String categoryName);
}