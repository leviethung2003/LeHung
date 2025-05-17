package com.main.service;

import com.main.entity.Orders;

import java.math.BigDecimal;
import java.util.List;

public interface OrderService {

    List<Orders> findByUserId(int userId);

    List<Orders> findAll();

    Orders findByOrderId(String orderId);

    Orders save(Orders orders);

    BigDecimal sumOrderPrice(Integer userId);

    BigDecimal countOrdersByAccountId(Integer userId);
}
