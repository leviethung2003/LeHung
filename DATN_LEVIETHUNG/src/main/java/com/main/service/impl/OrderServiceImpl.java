package com.main.service.impl;

import com.main.entity.Orders;
import com.main.repository.OrderRepository;
import com.main.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Override
    public List<Orders> findByUserId(int userId) {
        return orderRepository.findByUserIdOrderByDateCreatedDesc(userId);
    }

    @Override
    public List<Orders> findAll() {
        return orderRepository.findAllByOrderByDateCreatedDesc();
    }

    @Override
    public Orders findByOrderId(String orderId) {
        return orderRepository.getReferenceById(orderId);
    }

    @Override
    public Orders save(Orders orders) {
        return orderRepository.save(orders);
    }

    @Override
    public BigDecimal sumOrderPrice(Integer userId) {
        return orderRepository.sumOrdersPriceByAccountIdProfile(userId);
    }

    @Override
    public BigDecimal countOrdersByAccountId(Integer userId) {
        return orderRepository.countOrdersByAccountIdProfile(userId);
    }
}
