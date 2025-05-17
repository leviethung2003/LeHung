package com.main.repository;

import com.main.entity.ProductRateImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRateImageRepository extends JpaRepository<ProductRateImage, String> {
    List<ProductRateImage> findByProductRateId(String productRateId);
}
