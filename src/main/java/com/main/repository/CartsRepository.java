package com.main.repository;

import com.main.entity.Carts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartsRepository extends JpaRepository<Carts, Integer> {

    @Query("SELECT c, p, br, MIN(img.imagePath) " +
            "FROM Carts c " +
            "JOIN c.productsByProductId p " +
            "JOIN p.productBrandsByProductBrandId br " +
            "JOIN p.productImagesById img " +
            "JOIN c.usersByUserId u " +
            "WHERE u.id = :userId " +
            "GROUP BY c.id")
    List<Object[]> findAllCartByUserId(@Param("userId") int userId);

    Carts findByUserIdAndProductId(int userId, String productId);

    @Query("SELECT COUNT(c.productId) FROM Carts c JOIN c.usersByUserId u WHERE u.id = :userId")
    Integer countByAccountId(@Param("userId") int userId);

    @Query("SELECT SUM(p.price * c.quantity) FROM Carts c JOIN c.productsByProductId p JOIN c.usersByUserId u WHERE u.id = :userId")
    Integer findPriceByAccountId(@Param("userId") int userId);
}