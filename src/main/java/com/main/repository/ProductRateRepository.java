package com.main.repository;

import com.main.dto.ProductRateDto;
import com.main.entity.ProductRate;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRateRepository extends JpaRepository<ProductRate, String> {
    List<ProductRate> findByProductId(String productId);

    @Query("SELECT pr.id, pr.userId, p.productName, pr.dateCreated, pr.content, pr.rate, u.fullname, pi.imagePath, pr.orderId, pr.reviewStatus " +
            "FROM ProductRate pr " +
            "JOIN Products p ON pr.productId = p.id " +
            "JOIN Users u ON pr.userId = u.id " +
            "LEFT JOIN ProductRateImage pi ON pr.id = pi.productRateId " +  // Sử dụng LEFT JOIN để bao gồm cả trường hợp không có ảnh
            "WHERE p.id = :productId " +
            "GROUP BY pr.id, pr.userId, p.productName, pr.dateCreated, pr.content, pr.rate, u.fullname, pi.imagePath")
    List<Object[]> findRateByProductId(@Param("productId") String productId);

}
