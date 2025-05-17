package com.main.service.impl;

import com.main.entity.Products;
import com.main.repository.ProductsRepository;
import com.main.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductsRepository productsRepository;

    @Override
    public List<Products> findAll() {
        return productsRepository.findAll();
    }

    @Override
    public List<Products> findAllByProductId(String productId) {
        return productsRepository.findAllById(productId);
    }

    @Override
    public List<Object[]> findTopProductByCategoryId(int categoryId) {
        return productsRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Integer> findPriceProductByUserId(int userId) {
        return productsRepository.findPriceByUserId(userId);
    }

    @Override
    public Products findProductByProductId(String productId) {
        return productsRepository.getReferenceById(productId);
    }

    @Override
    public Optional<Products> findByProductId(String productId) {
        return Optional.of(productsRepository.getReferenceById(productId));
    }

    @Override
    public void save(Products products) {
        productsRepository.save(products);
    }

    @Override
    public boolean doesProductExist(String productId) {
        return productsRepository.existsById(productId);
    }

    @Override
    public List<Products> findByProductTypeId(int productTypeId) {
        return productsRepository.findByProductTypeId(productTypeId);
    }

    @Override
    public List<Products> findByCategoryIdAndProductNameContaining(int categoryId, String productName) {
        return productsRepository.findByCategoryIdAndProductNameContaining(categoryId, productName);
    }

    @Override
    public List<Products> findByCategoryByProductTypeByProducts(int categoryId) {
        return productsRepository.findByCategoryByProductTypeByProducts(categoryId);
    }

    @Override
    public List<Object[]> findByCategoryIdAndProductTypeId(int categoryId, int productTypeId) {
        return productsRepository.findByCategoryIdAndProductTypeId(categoryId, productTypeId);
    }

    @Override
    public Products findCloserSale() {
        return productsRepository.findCloserSale();
    }

    @Override
    public List<Object[]> findAllProductBeingSale() {
        return productsRepository.findAllSaleProduct();
    }
}
