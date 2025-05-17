package com.main.service;

import com.main.dto.DiscountsDto;
import com.main.dto.OrdersDto;
import com.main.dto.PasswordsDto;
import com.main.dto.RegisterDto;
import com.main.entity.Orders;

public interface EmailService {

    void sendMailRegister();

    void queueEmailRegister(RegisterDto registerDto);

    void sendMailCreateOrder();

    void queueMailCreateOrder(OrdersDto ordersDto);

    void sendMailForgot();

    void queueEmailForgot(PasswordsDto passwordsDto);

    void sendMailNotice();

    void queueEmailNotice(DiscountsDto discountsDto);

    void sendMailConfirmOrder();

    void queueEmailConfirmOrder(Orders orders);

    void sendMailReceiveOrder();

    void queueEmailReceiveOrder(Orders orders);

    void sendMailCancelOrder();

    void queueEmailCancelOrder(Orders orders);

    void sendMailCancelOrderByCustomer();

    void queueEmailCancelOrderByCustomer(Orders orders);
}
