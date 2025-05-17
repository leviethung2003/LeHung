package com.main.controller.restcontroller;

import com.main.entity.ProductTypes;
import com.main.service.ProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("api")
public class ProductTypeAPI {

    @Autowired
    ProductTypeService productTypeService;

    @GetMapping("product-type/{categoryId}")
    public List<ProductTypes> productTypeByCategoryId(@PathVariable int categoryId) {
        return productTypeService.findByCategoryId(categoryId);
    }
}