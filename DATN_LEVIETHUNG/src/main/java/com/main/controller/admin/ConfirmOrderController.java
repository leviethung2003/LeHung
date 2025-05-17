package com.main.controller.admin;

import com.main.entity.Orders;
import com.main.service.EmailService;
import com.main.service.OrderItemService;
import com.main.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.Timestamp;
import java.util.List;

@Controller
@RequestMapping("quan-tri")
public class ConfirmOrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    OrderItemService orderItemService;

    @Autowired
    EmailService emailService;

    @GetMapping("xac-nhan-don-hang")
    public String confirm_order() {
        return "views/admin/page/views/confirm-order-list";
    }

    @GetMapping("api/confirmOrder/{orderId}")
    private ResponseEntity<Orders> confirmOrder(@PathVariable String orderId) {
        Orders order = orderService.findByOrderId(orderId);
        order.setOrderStatus("Đang vận chuyển");

        emailService.queueEmailConfirmOrder(order);
        return ResponseEntity.ok().body(orderService.save(order));
    }

    @GetMapping("api/deliveredOrder/{orderId}")
    private ResponseEntity<Orders> deliveredOrder(@PathVariable String orderId) {
        Orders order = orderService.findByOrderId(orderId);

        if (order.getPaymentType()) {
            order.setDatePayment(new Timestamp(System.currentTimeMillis()));
        }
        order.setOrderStatus("Đã giao hàng");
        order.setPaymentStatus(1);
        order.setDateReceive(new Timestamp(System.currentTimeMillis()));

        emailService.queueEmailReceiveOrder(order);
        return ResponseEntity.ok().body(orderService.save(order));
    }

    @GetMapping("api/cancelOrder/{orderId}")
    private ResponseEntity<Orders> cancelOrder(@PathVariable String orderId) {
        Orders order = orderService.findByOrderId(orderId);
        order.setOrderStatus("Đã huỷ đơn");
        order.setOrderNoteCancelled("Huỷ đơn bởi người bán. Nếu có thắc mắc xin vui lòng liên hệ +84 918.619.651");
        order.setPaymentStatus(2);
        order.setDateReceive(new Timestamp(System.currentTimeMillis()));

        emailService.queueEmailCancelOrder(order);
        return ResponseEntity.ok().body(orderService.save(order));
    }

    @GetMapping("api/cancelOrderByCustomer/{orderId}")
    private ResponseEntity<Orders> cancelOrderByCustomer(@PathVariable String orderId) {
        Orders order = orderService.findByOrderId(orderId);
        order.setOrderStatus("Đã huỷ đơn");
        order.setOrderNoteCancelled("Huỷ đơn bởi người mua hàng. Khách hàng không nhận hàng " + orderId + " đang chờ chuyển hoàn");
        order.setPaymentStatus(2);
        order.setDateReceive(new Timestamp(System.currentTimeMillis()));

        emailService.queueEmailCancelOrderByCustomer(order);
        return ResponseEntity.ok().body(orderService.save(order));
    }

    @GetMapping("api/findAllOrder")
    private ResponseEntity<List<Orders>> findAllOrder() {
        return ResponseEntity.ok().body(orderService.findAll());
    }

    @GetMapping("api/findByOrderId/{orderId}")
    private ResponseEntity<Orders> findByOrderId(@PathVariable String orderId) {
        return ResponseEntity.ok().body(orderService.findByOrderId(orderId));
    }

    @GetMapping("api/findOrderItemByOrderId/{orderId}")
    private ResponseEntity<List<Object[]>> findOrderItemByOrderId(@PathVariable String orderId) {
        return ResponseEntity.ok().body(orderItemService.findByOrderId(orderId));
    }
}
