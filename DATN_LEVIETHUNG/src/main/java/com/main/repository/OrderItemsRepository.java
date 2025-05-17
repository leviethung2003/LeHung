package com.main.repository;

import com.main.entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemsRepository extends JpaRepository<OrderItems, Integer> {

    @Query("SELECT ot, p FROM OrderItems ot JOIN ot.productsByProductId p WHERE ot.orderId = :orderId")
    List<Object[]> findByOrderId(@Param("orderId") String orderId);

    @Query("SELECT ot FROM OrderItems ot " +
            "JOIN ot.productsByProductId p " +
            "JOIN ot.ordersByOrderId o " +
            "WHERE ot.orderId = :orderId")
    List<OrderItems> findAllByOrderItem(@Param("orderId") String orderId);

    List<OrderItems> findByOrderIdAndProductId(String orderId, String productId);
}