package com.main.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class CancelOrderDto implements Serializable {

    private String orderId;

    private String reason;

    private String comments;
}
