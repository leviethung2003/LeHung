package com.main.repository;

import com.main.entity.ProductImages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImagesRepository extends JpaRepository<ProductImages, String> {
}