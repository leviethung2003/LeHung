package com.main.controller.restcontroller;

import com.main.entity.ProductBrands;
import com.main.entity.ProductCategories;
import com.main.entity.Products;
import com.main.entity.SaleOff;
import com.main.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("api")
public class ProductAPI {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductCategoryService categoryService;

    @Autowired
    private ProductBrandService productBrandService;

    @Autowired
    private SaleOffService saleOffService;

    @GetMapping("product")
    public List<Products> productList() {
        return productService.findAll();
    }

    @GetMapping("product/findByProductId/{productId}")
    public List<Products> findByProductId(@PathVariable String productId) {
        return productService.findAllByProductId(productId);
    }

    // tìm ra product bằng mã
    @GetMapping("product/find-by-id/{productId}")
    public ResponseEntity<Products> getAccountById(@PathVariable String productId) {
        Products product = productService.findProductByProductId(productId);
        return ResponseEntity.ok().body(product);
    }

    // tìm ra 4 danh mục đầu tiên
    @GetMapping("product/get-top4-category")
    public List<ProductCategories> showCategory() {
        Pageable pageable = PageRequest.of(0, 4);
        return categoryService.findAllTop4(pageable);
    }

    // tìm ra sản phẩm bằng mã danh mục
    @GetMapping("product/{categoryId}")
    public List<Object[]> productGetById(@PathVariable int categoryId) {
        return productService.findTopProductByCategoryId(categoryId);
    }

    @GetMapping("products/{categoryId}")
    public List<Products> productsList(@PathVariable int categoryId) {
        return productService.findByCategoryByProductTypeByProducts(categoryId);
    }

    @GetMapping("product/brandName/{productBrandId}")
    public ProductBrands brandNameByProduct(@PathVariable String productBrandId) {
        return productBrandService.findBandByProductId(productBrandId);
    }

    @GetMapping("product/find-all")
    public List<Products> getAllProducts() {
        return productService.findAll();
    }

    @GetMapping("product/find-product-by-product-type/{productTypeId}")
    public List<Products> findProductByProductType(@PathVariable int productTypeId) {
        return productService.findByProductTypeId(productTypeId);
    }

    @GetMapping("product/find-product-by-category-id-by-key/{categoryId}/{ten-san-pham}")
    public List<Products> findProductByCategoryIdAndKey(@PathVariable(name = "categoryId") int categoryId, @PathVariable(name = "ten-san-pham") String search) {
        return productService.findByCategoryIdAndProductNameContaining(categoryId, search);
    }

    @GetMapping("product/find-by-category-id-by-product-type-id/{categoryId}/{productTypeId}")
    public List<Object[]> findProductByCategoryIdAndProductTypeId(@PathVariable(name = "categoryId") int categoryId, @PathVariable(name = "productTypeId") int productTypeId) {
        return productService.findByCategoryIdAndProductTypeId(categoryId, productTypeId);
    }

    //sale off
    @GetMapping("product/sale-off/{productId}")
    public SaleOff findSaleOffByProductId(@PathVariable String productId) {
        return saleOffService.findByProductId(productId);
    }

    @GetMapping("product/sale-off")
    public List<SaleOff> findAllSaleOff() {
        return saleOffService.findAll();
    }

    @GetMapping("product/sale-off-closer")
    public Products findProductCloserSale() {
        return productService.findCloserSale();
    }

    @GetMapping("product/all-sale-off-closer")
    public List<Object[]> findALProductCloserSale() {
        return productService.findAllProductBeingSale();
    }
}
