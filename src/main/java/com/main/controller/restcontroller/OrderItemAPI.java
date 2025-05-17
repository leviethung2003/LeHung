package com.main.controller.restcontroller;

import com.main.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:8080")
public class OrderItemAPI {

    @Autowired
    OrderItemService orderItemService;

    @GetMapping("order-item/findByOrderId/{orderId}")
    private List<Object[]> findByOrderId(@PathVariable String orderId) {
        return orderItemService.findByOrderId(orderId);
    }
}
