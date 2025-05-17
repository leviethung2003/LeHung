package com.main.controller.restcontroller;

import com.main.entity.ProductCategories;
import com.main.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("api")
public class ProductCategoryAPI {

    @Autowired
    ProductCategoryService productCategoryService;

    @GetMapping("product-category")
    public List<ProductCategories> showProductType() {
        return productCategoryService.findAll();
    }
}
