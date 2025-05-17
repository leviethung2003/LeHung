package com.main.service.impl;

import com.main.dto.DiscountsDto;
import com.main.dto.OrdersDto;
import com.main.dto.PasswordsDto;
import com.main.dto.RegisterDto;
import com.main.entity.OrderItems;
import com.main.entity.Orders;
import com.main.entity.Users;
import com.main.service.*;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@EnableScheduling
public class EmailServiceImpl implements EmailService {

    Queue<RegisterDto> emailQueueRegister = new LinkedList<>();
    Queue<OrdersDto> emailQueueOrder = new LinkedList<>();
    Queue<PasswordsDto> emailQueueForgot = new LinkedList<>();
    Queue<DiscountsDto> emailQueueNotice = new LinkedList<>();
    Queue<Orders> emailQueueConfirmOder = new LinkedList<>();
    Queue<Orders> emailQueueReceiveOder = new LinkedList<>();
    Queue<Orders> emailQueueCancelOder = new LinkedList<>();
    Queue<Orders> emailQueueCancelOderCustomer = new LinkedList<>();

    @Autowired
    JavaMailSender sender;

    @Autowired
    ThymeleafService thymeleafService;

    @Autowired
    UserService userService;

    @Autowired
    OrderItemService orderItemService;

    @Autowired
    DiscountService discountService;

    @Autowired
    SaleOffService saleOffService;

    @Value("${spring.mail.username}")
    private String email;

    @Override
    public void queueEmailRegister(RegisterDto registerDto) {
        emailQueueRegister.add(registerDto);
    }

    @Override
    public void sendMailRegister() {
        while (!emailQueueRegister.isEmpty()) {
            RegisterDto registerDto = emailQueueRegister.poll();
            Users users = userService.findByEmail(registerDto.getEmail());
            try {
                MimeMessage message = sender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

                helper.setTo(registerDto.getEmail());

                Map<String, Object> variables = new HashMap<>();
                variables.put("email", registerDto.getEmail());
                variables.put("password", registerDto.getPassword());
                variables.put("full_name", registerDto.getFullname());
                variables.put("phone_number", registerDto.getPhoneNumber());
                variables.put("token", users.getToken());
                SimpleDateFormat sdfdate = new SimpleDateFormat("dd-MM-yyyy");
                SimpleDateFormat sdftime = new SimpleDateFormat("HH:mm:ss");
                variables.put("date", sdfdate.format(new Date()));
                variables.put("time", sdftime.format(new Date()));

                helper.setFrom(email);
                helper.setText(thymeleafService.createContent("verify-email", variables), true);
                helper.setSubject("SOLAR BÁCH THỊNH XIN CHÂN THÀNH CẢM ƠN QUÝ KHÁCH HÀNG ĐÃ ĐĂNG KÝ TÀI KHOẢN");

                sender.send(message);
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public void queueMailCreateOrder(OrdersDto ordersDto) {
        emailQueueOrder.add(ordersDto);
    }

    @Override
    public void sendMailCreateOrder() {
        while (!emailQueueOrder.isEmpty()) {
            int priceProduct = 0;
            BigDecimal discountCost = BigDecimal.valueOf(0);

            OrdersDto ordersDto = emailQueueOrder.poll();

            List<OrderItems> orderItems = orderItemService.findAllOrderItemByOrderId(ordersDto.getOrderId());

            for (OrderItems items : orderItems) {
                BigDecimal price = items.getPrice();
                int quantity = items.getQuantity();

                priceProduct = price.intValue() * quantity;

                if (items.getOrdersByOrderId().getDiscountsByDiscountId() != null) {
                    discountCost = items.getOrdersByOrderId().getDiscountsByDiscountId().getDiscountCost();
                } else {
                    discountCost = BigDecimal.ZERO;
                }
            }

            try {
                MimeMessage message = sender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

                helper.setTo(ordersDto.getEmail());

                Map<String, Object> variables = new HashMap<>();
                variables.put("order", ordersDto);
                variables.put("full_name", ordersDto.getUser_payment().getFullname());
                variables.put("orderItem", orderItems);
                variables.put("priceProduct", priceProduct);
                variables.put("discountCost", discountCost);

                SimpleDateFormat sdfDate = new SimpleDateFormat("dd-MM-yyyy");
                SimpleDateFormat sdfTime = new SimpleDateFormat("HH:mm:ss");
                variables.put("date", sdfDate.format(new Date()));
                variables.put("time", sdfTime.format(new Date()));

                helper.setFrom(email);
                helper.setText(thymeleafService.createContent("mail-payment", variables), true);
                helper.setSubject("SOLAR BÁCH THỊNH XIN CHÂN THÀNH CẢM ƠN QUÝ KHÁCH HÀNG ĐÃ MUA HÀNG");

                sender.send(message);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public void queueEmailForgot(PasswordsDto passwordsDto) {
        emailQueueForgot.add(passwordsDto);
    }

    @Override
    public void sendMailForgot() {
        while (!emailQueueForgot.isEmpty()) {
            PasswordsDto passwordsDto = emailQueueForgot.poll();
            try {
                MimeMessage message = sender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

                helper.setTo(passwordsDto.getEmail());

                Map<String, Object> variables = new HashMap<>();
                variables.put("full_name", passwordsDto.getFull_name());
                variables.put("verifyCode", passwordsDto.getVerifyCode());

                helper.setFrom(email);
                helper.setText(thymeleafService.createContent("send-otp", variables), true);
                helper.setSubject("SOLAR BÁCH THỊNH - XÁC NHẬN OTP");

                sender.send(message);
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public void queueEmailNotice(DiscountsDto discountsDto) {
        emailQueueNotice.add(discountsDto);
    }

    public void sendMailNotice() {
        while (!emailQueueNotice.isEmpty()) {
            DiscountsDto discountsDto = emailQueueNotice.poll();
            // Lấy danh sách tất cả khách hàng từ dữ liệu (giả sử từ một service nào đó)
            List<Users> customers = userService.findUserByActiveIsTrue();

            // Lặp qua danh sách khách hàng và gửi mail cho mỗi khách hàng
            for (Users customer : customers) {
                try {
                    MimeMessage message = sender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

                    helper.setTo(customer.getEmail());

                    Map<String, Object> variables = new HashMap<>();
                    variables.put("full_name", customer.getFullname());
                    variables.put("discountCode", discountsDto.getId()); // Hàm sinh mã giảm giá mới
                    variables.put("cost", discountsDto.getDiscountCost());
                    variables.put("startUse", discountsDto.getStartUse());
                    variables.put("endUse", discountsDto.getEndUse());

                    helper.setFrom(email);
                    helper.setText(thymeleafService.createContent("send-discount", variables), true);
                    helper.setSubject("SOLAR BÁCH THỊNH - MÃ GIẢM GIÁ MỚI");

                    sender.send(message);
                } catch (MessagingException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    @Override
    public void queueEmailConfirmOrder(Orders orders) {
        emailQueueConfirmOder.add(orders);
    }

    @Override
    public void sendMailConfirmOrder() {
        while (!emailQueueConfirmOder.isEmpty()) {
            Orders orders = emailQueueConfirmOder.poll();

            try {
                MimeMessage message = sender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

                helper.setTo(orders.getToEmail());

                Map<String, Object> variables = new HashMap<>();
                variables.put("orderId", orders.getId());
                variables.put("full_name", orders.getToName());
                variables.put("toAddress", orders.getToAddress());
                variables.put("toWard", orders.getToWard());
                variables.put("toDistrict", orders.getToDistrict());
                variables.put("toProvince", orders.getToProvince());

                helper.setFrom(email);
                helper.setText(thymeleafService.createContent("confirm-order", variables), true);
                helper.setSubject("SOLAR BÁCH THỊNH - XÁC NHẬN ĐƠN HÀNG THÀNH CÔNG");

                sender.send(message);
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public void queueEmailReceiveOrder(Orders orders) {
        emailQueueReceiveOder.add(orders);
    }

    @Override
    public void sendMailReceiveOrder() {
        while (!emailQueueReceiveOder.isEmpty()) {
            int totalPrice = 0;
            BigDecimal discountCost = BigDecimal.valueOf(0);

            Orders orders = emailQueueReceiveOder.poll();

            List<OrderItems> orderItems = orderItemService.findAllOrderItemByOrderId(orders.getId());

            for (OrderItems items : orderItems) {
                BigDecimal price = items.getPrice();
                int quantity = items.getQuantity();

                int priceProduct = price.intValue() * quantity;

                totalPrice += priceProduct;

                if (items.getOrdersByOrderId().getDiscountsByDiscountId() != null) {
                    discountCost = items.getOrdersByOrderId().getDiscountsByDiscountId().getDiscountCost();
                } else {
                    discountCost = BigDecimal.ZERO;
                }
            }

            try {
                MimeMessage message = sender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

                helper.setTo(orders.getToEmail());

                Map<String, Object> variables = new HashMap<>();
                variables.put("order", orders);
                variables.put("full_name", orders.getToName());
                variables.put("orderItem", orderItems);
                variables.put("discountCost", discountCost);
                variables.put("totalPrice", totalPrice);

                helper.setFrom(email);
                helper.setText(thymeleafService.createContent("mail-receive", variables), true);
                helper.setSubject("SOLAR BÁCH THỊNH - ĐƠN HÀNG " + orders.getId() + " ĐÃ ĐƯỢC GIAO THÀNH CÔNG !");

                sender.send(message);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public void queueEmailCancelOrder(Orders orders) {
        emailQueueCancelOder.add(orders);
    }

    @Override
    public void sendMailCancelOrder() {
        while (!emailQueueCancelOder.isEmpty()) {
            int totalPrice = 0;
            BigDecimal discountCost = BigDecimal.valueOf(0);

            Orders orders = emailQueueCancelOder.poll();

            List<OrderItems> orderItems = orderItemService.findAllOrderItemByOrderId(orders.getId());

            for (OrderItems items : orderItems) {
                BigDecimal price = items.getPrice();
                int quantity = items.getQuantity();

                int priceProduct = price.intValue() * quantity;

                totalPrice += priceProduct;

                if (items.getOrdersByOrderId().getDiscountsByDiscountId() != null) {
                    discountCost = items.getOrdersByOrderId().getDiscountsByDiscountId().getDiscountCost();
                } else {
                    discountCost = BigDecimal.ZERO;
                }
            }

            try {
                MimeMessage message = sender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

                helper.setTo(orders.getToEmail());

                Map<String, Object> variables = new HashMap<>();
                variables.put("order", orders);
                variables.put("full_name", orders.getToName());
                variables.put("orderItem", orderItems);
                variables.put("discountCost", discountCost);
                variables.put("totalPrice", totalPrice);

                helper.setFrom(email);
                helper.setText(thymeleafService.createContent("mail-cancel", variables), true);
                helper.setSubject("SOLAR BÁCH THỊNH - ĐƠN HÀNG " + orders.getId() + " ĐÃ ĐƯỢC HUỶ THÀNH CÔNG !");

                sender.send(message);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public void queueEmailCancelOrderByCustomer(Orders orders) {
        emailQueueCancelOderCustomer.add(orders);
    }

    @Override
    public void sendMailCancelOrderByCustomer() {
        while (!emailQueueCancelOderCustomer.isEmpty()) {
            int totalPrice = 0;
            BigDecimal discountCost = BigDecimal.valueOf(0);

            Orders orders = emailQueueCancelOderCustomer.poll();

            List<OrderItems> orderItems = orderItemService.findAllOrderItemByOrderId(orders.getId());

            for (OrderItems items : orderItems) {
                BigDecimal price = items.getPrice();
                int quantity = items.getQuantity();

                int priceProduct = price.intValue() * quantity;

                totalPrice += priceProduct;

                if (items.getOrdersByOrderId().getDiscountsByDiscountId() != null) {
                    discountCost = items.getOrdersByOrderId().getDiscountsByDiscountId().getDiscountCost();
                } else {
                    discountCost = BigDecimal.ZERO;
                }
            }

            try {
                MimeMessage message = sender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

                helper.setTo(orders.getToEmail());

                Map<String, Object> variables = new HashMap<>();
                variables.put("order", orders);
                variables.put("full_name", orders.getToName());
                variables.put("orderItem", orderItems);
                variables.put("discountCost", discountCost);
                variables.put("totalPrice", totalPrice);

                helper.setFrom(email);
                helper.setText(thymeleafService.createContent("mail-cancel-by-customer", variables), true);
                helper.setSubject("SOLAR BÁCH THỊNH - ĐƠN HÀNG " + orders.getId() + " ĐÃ ĐƯỢC HUỶ THÀNH CÔNG. Lí do " + orders.getOrderNote());
                sender.send(message);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Scheduled(fixedDelay = 5000)
    public void processRegister() {
        sendMailRegister();
    }

    @Scheduled(fixedDelay = 5000)
    public void processCreateOrder() {
        sendMailCreateOrder();
    }

    @Scheduled(fixedDelay = 5000)
    public void processEmailForgot() {
        sendMailForgot();
    }

    @Scheduled(fixedDelay = 5000)
    public void processEmailFNotice() {
        sendMailNotice();
    }

    @Scheduled(fixedDelay = 5000)
    public void processConfirmOrder() {
        sendMailConfirmOrder();
    }

    @Scheduled(fixedDelay = 5000)
    public void processReceiveOrder() {
        sendMailReceiveOrder();
    }

    @Scheduled(fixedDelay = 5000)
    public void processCancelOrder() {
        sendMailCancelOrder();
    }

    @Scheduled(fixedDelay = 5000)
    public void processCancelOrderByCustomer() {
        sendMailCancelOrderByCustomer();
    }
}
