package com.main.service.impl;

import com.main.entity.OrderItems;
import com.main.repository.OrderItemsRepository;
import com.main.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    OrderItemsRepository orderItemsRepository;

    @Override
    public List<Object[]> findByOrderId(String orderId) {
        return orderItemsRepository.findByOrderId(orderId);
    }

    @Override
    public List<OrderItems> findAllOrderItemByOrderId(String orderId) {
        return orderItemsRepository.findAllByOrderItem(orderId);
    }

    @Override
    public OrderItems save(OrderItems orderItems) {
        return orderItemsRepository.save(orderItems);
    }

    @Override
    public List<OrderItems> findByOrderIdAndProductId(String orderId, String productId) {
        return orderItemsRepository.findByOrderIdAndProductId(orderId, productId);
    }
}
