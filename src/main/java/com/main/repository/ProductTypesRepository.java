package com.main.repository;

import com.main.entity.ProductTypes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductTypesRepository extends JpaRepository<ProductTypes, Integer> {

    List<ProductTypes> findById(int categoryId);

    List<ProductTypes> findByCategoryId(int categoryId);

}