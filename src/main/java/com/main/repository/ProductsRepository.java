package com.main.repository;

import com.main.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductsRepository extends JpaRepository<Products, String> {

    List<Products> findAllById(String productId);

    @Query("SELECT p, br FROM Products p " +
            "JOIN p.productBrandsByProductBrandId br " +
            "JOIN p.productTypesByProductTypeId pt " +
            "JOIN pt.productCategoriesByCategoryId c  " +
            "WHERE c.id = :categoryId " +
            "ORDER BY p.dateCreated DESC LIMIT 10"
    )
    List<Object[]> findByCategoryId(@Param("categoryId") int categoryId);

    List<Products> findByProductTypeId(int productTypeId);

    @Query("SELECT p.price FROM Products p JOIN p.cartsById c JOIN c.usersByUserId u WHERE u.id = :userId")
    List<Integer> findPriceByUserId(int userId);

    @Query("SELECT p FROM Products p " +
            "JOIN p.productTypesByProductTypeId pt " +
            "JOIN pt.productCategoriesByCategoryId pc " +
            "WHERE pc.id = :categoryId AND LOWER(p.productName) LIKE LOWER(concat('%', :productName, '%'))")
    List<Products> findByCategoryIdAndProductNameContaining(@Param("categoryId") int categoryId, @Param("productName") String productName);


    @Query("SELECT p FROM Products p " +
            "JOIN p.productTypesByProductTypeId pt " +
            "JOIN pt.productCategoriesByCategoryId pc " +
            "WHERE pc.id = :categoryId")
    List<Products> findByCategoryByProductTypeByProducts(@Param("categoryId") int categoryId);

    @Query("SELECT p, br FROM Products p " +
            "JOIN p.productBrandsByProductBrandId br " +
            "JOIN p.productTypesByProductTypeId pt " +
            "JOIN pt.productCategoriesByCategoryId c  " +
            "WHERE c.id = :categoryId and pt.id = :productTypeId"
    )
    List<Object[]> findByCategoryIdAndProductTypeId(@Param("categoryId") int categoryId, @Param("productTypeId") int productTypeId);

    @Query(value = "SELECT calculatePercentageSoldForProduct(:productId) as percentage_sold", nativeQuery = true)
    Double calculatePercentageSoldForProduct(@Param("productId") String productId);

    @Query("SELECT p, s, br FROM Products p " +
            "JOIN p.productSaleOffById s  " +
            "JOIN p.productBrandsByProductBrandId br " +
            "WHERE s.endUse > NOW() " +
            "ORDER BY s.endUse ASC " +
            "LIMIT 1")
    Products findCloserSale();

    @Query("SELECT p, s, br FROM Products p " +
            "JOIN p.productSaleOffById s  " +
            "JOIN p.productBrandsByProductBrandId br " +
            "WHERE s.endUse > NOW() and s.isActive = true " +
            "ORDER BY s.endUse ASC ")
    List<Object[]> findAllSaleProduct();
}