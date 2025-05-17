package com.main.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
public class OrdersDto implements Serializable {

    private String email;

    private String orderId;

    private String noted;

    private String paymentMethod;

    private Integer paymentStatus;

    private String serviceName;

    private String discountId;

    private Integer shippingFee;

    private String dateExpected;

    private double total;

    private UserPaymentDto user_payment;

    private ProductCartDto productCartDto;
}