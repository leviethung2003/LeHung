package com.main.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
public class NotificationOrderDto implements Serializable {

    int userId;

    String orderId;

    String message;

    Timestamp dateCreated;
}