package com.main.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class OrderItemsDto implements Serializable {

    int id;

    String orderId;

    String productId;

    Integer price;

    Integer quantity;

    Boolean statusRate;
}