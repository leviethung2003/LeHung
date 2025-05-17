package com.main.controller.restcontroller;

import com.main.entity.ProductBrands;
import com.main.service.ProductBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("api")
public class ProductBrandAPI {

    @Autowired
    ProductBrandService productBrandService;

    @GetMapping("product-brand/{brandId}")
    public ProductBrands getByBrandId(@PathVariable String brandId) {
        return productBrandService.findByProductBrandId(brandId);
    }
}
