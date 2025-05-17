package com.main.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class CartsDto implements Serializable {

    String id;

    int userId;

    String productId;

    Integer quantity;
}