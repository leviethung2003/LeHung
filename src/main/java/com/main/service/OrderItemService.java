package com.main.service;

import com.main.entity.OrderItems;

import java.util.List;

public interface OrderItemService {

    List<Object[]> findByOrderId(String orderId);

    List<OrderItems> findAllOrderItemByOrderId(String orderId);

    OrderItems save(OrderItems orderItems);

    List<OrderItems> findByOrderIdAndProductId(String orderId, String productId);
}
