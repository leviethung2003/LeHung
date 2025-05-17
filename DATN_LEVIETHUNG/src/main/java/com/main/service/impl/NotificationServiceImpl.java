package com.main.service.impl;

import com.main.entity.NotificationOrder;
import com.main.repository.NotificationOrderRepository;
import com.main.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationOrderRepository notificationRepo;

    @Override
    public List<NotificationOrder> findAll() {
        return notificationRepo.findAllByOrderByDateCreatedDesc();
    }

    @Override
    public NotificationOrder findById(int id) {
        return notificationRepo.getReferenceById(id);
    }

    @Override
    public void delete(NotificationOrder notificationOrder) {
        notificationRepo.delete(notificationOrder);
    }

    @Override
    public void save(NotificationOrder notificationOrder) {
        notificationRepo.save(notificationOrder);
    }
}
