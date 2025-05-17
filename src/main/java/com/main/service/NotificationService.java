package com.main.service;

import com.main.entity.NotificationOrder;

import java.util.List;

public interface NotificationService {

    List<NotificationOrder> findAll();

    NotificationOrder findById(int id);

    void delete(NotificationOrder notificationOrder);

    void save(NotificationOrder notificationOrder);
}
