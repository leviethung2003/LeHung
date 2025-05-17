package com.main.controller.restcontroller;

import com.main.dto.CancelOrderDto;
import com.main.dto.OrdersDto;
import com.main.dto.UserPaymentDto;
import com.main.entity.*;
import com.main.service.*;
import com.main.utils.EntityDtoUtils;
import com.main.utils.SessionAttr;
import jakarta.servlet.http.HttpSession;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("api")
public class OrderAPI {

    @Autowired
    OrderService orderService;

    @Autowired
    CartService cartService;

    @Autowired
    OrderItemService orderItemService;

    @Autowired
    ProductService productService;

    @Autowired
    SaleOffService saleOffService;

    @Autowired
    NotificationService notificationService;

    @Autowired
    EmailService emailService;

    @Autowired
    HttpSession session;

    @GetMapping("order/history-payment/{userId}")
    private List<Orders> findAllByUserId(@PathVariable int userId) {
        return orderService.findByUserId(userId);
    }

    @GetMapping("order/findById/{orderId}")
    private ResponseEntity<Orders> findByOrderId(@PathVariable String orderId) {
        Orders order = orderService.findByOrderId(orderId);
        return ResponseEntity.ok().body(order);
    }

    @PostMapping("order/cancel-order")
    private void cancelOrder(@RequestBody CancelOrderDto cancelOrderDto) {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);
        Orders order = orderService.findByOrderId(cancelOrderDto.getOrderId());

        order.setOrderStatus("Đã huỷ đơn");
        if (cancelOrderDto.getReason().equals("Mục khác...")) {
            order.setOrderNoteCancelled(cancelOrderDto.getComments());
        } else {
            order.setOrderNoteCancelled(cancelOrderDto.getReason());
        }
        order.setPaymentStatus(2);
        order.setDateReceive(new Timestamp(System.currentTimeMillis()));

        emailService.queueEmailCancelOrderByCustomer(order);
        orderService.save(order);

        // tao ra thông báo vào bảng notification
        createNotification(order.getId(), users, "Đơn hàng " + order.getId() + " đã huỷ.");
    }

    @PostMapping(value = "order/create-order", consumes = {"application/json;charset=UTF-8"})
    private void createOrder(@RequestBody OrdersDto ordersDto) {
        String orderId = ordersDto.getOrderId();
        String discountId = ordersDto.getDiscountId();

        int paymentStatus = ordersDto.getPaymentStatus();

        boolean paymentType = "COD".equals(ordersDto.getPaymentMethod());

        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);

        Orders orders = new Orders();
        orders.setId(orderId);
        orders.setUserId(users.getId());
        if (StringUtils.isNotEmpty(discountId)) {
            orders.setDiscountId(discountId);
        }
        orders.setPaymentStatus(paymentStatus);
        orders.setPaymentType(paymentType);
        orders.setOrderStatus("Chờ xác nhận");
        orders.setOrderShipCost(BigDecimal.valueOf(ordersDto.getShippingFee()));

        UserPaymentDto userPayment = ordersDto.getUser_payment();
        if (userPayment != null) {
            orders.setToName(userPayment.getFullname());
            orders.setToPhone(userPayment.getPhoneNumber());
            orders.setToEmail(ordersDto.getEmail());
            orders.setToProvince(userPayment.getProvinceName());
            orders.setToDistrict(userPayment.getDistrictName());
            orders.setToWard(userPayment.getWardName());
            orders.setToAddress(userPayment.getAddress());
        }

        orders.setOrderNote(ordersDto.getNoted());
        orders.setDateCreated(new Timestamp(System.currentTimeMillis()));
        orders.setDateExpected(ordersDto.getDateExpected());

        if (!paymentType) {
            orders.setDatePayment(new Timestamp(System.currentTimeMillis()));
        }

        // lưu đơn hàng vào db
        orderService.save(orders);

        // gửi mail đơn hàng
        if (paymentStatus == 0 || paymentStatus == 1) {
            emailService.queueMailCreateOrder(ordersDto);
        }

        // tạo ra order item sau khi lưu đơn hàng
        Object[] cartsList = ordersDto.getProductCartDto().getCartsList();
        createOrderItem(orderId, cartsList);

        // xoá giỏ hàng
        deleteCart(cartsList);

        // tao ra thông báo vào bảng notification
        createNotification(orderId, users, "Đơn hàng " + orderId + " đã tạo.");
    }

    // // tạo ra order item sau khi lưu đơn hàng
    private void createOrderItem(String orderId, Object[] cartsList) {
        for (Object cart : cartsList) {
            if (cart instanceof LinkedHashMap) {
                OrderItems orderItems = new OrderItems();

                Carts carts = EntityDtoUtils.convertToEntity(cart, Carts.class);
                Products products = productService.findProductByProductId(carts.getProductId());

                // kiểm tra xem có giảm giá không
                SaleOff saleOff = saleOffService.findByProductId(products.getId());

                if (saleOff != null && saleOff.getIsActive()) {
                    orderItems.setPrice(saleOff.getSaleValue());
                } else {
                    orderItems.setPrice(products.getPrice());
                }

                orderItems.setOrderId(orderId);
                orderItems.setProductId(carts.getProductId());
                orderItems.setQuantity(carts.getQuantity());
                orderItemService.save(orderItems);

                decreaseQuantityProduct(orderItems.getProductId(), orderItems.getQuantity());
            }
        }
    }

    // xoá giỏ hàng sau khi đặt hàng thành công
    private void deleteCart(Object[] cartsList) {
        for (Object cart : cartsList) {
            if (cart instanceof LinkedHashMap) {
                Carts carts = EntityDtoUtils.convertToEntity(cart, Carts.class);
                cartService.delete(carts.getId());
            }
        }
    }

    // giảm số lượng sp trong đơn hàng vừa đặt
    private void decreaseQuantityProduct(String productId, int quantity) {
        Products product = productService.findProductByProductId(productId);

        if (product != null) {
            int currentQuantity = product.getQuantity();

            if (currentQuantity >= quantity) {
                int newQuantity = currentQuantity - quantity;
                product.setQuantity(newQuantity);
                productService.save(product);
            }
        }
    }

    // lưu vào bảng thông báo để hiển thị thông báo ở admin
    private void createNotification(String orderId, Users users, String message) {
        NotificationOrder notification = new NotificationOrder();
        notification.setOrderId(orderId);
        notification.setUserId(users.getId());
        notification.setMessage(message);
        notification.setIsSeen(true);
        notification.setDateCreated(new Timestamp(System.currentTimeMillis()));
        notificationService.save(notification);
    }
}