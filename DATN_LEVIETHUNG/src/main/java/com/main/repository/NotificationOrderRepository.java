package com.main.repository;

import com.main.entity.NotificationOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationOrderRepository extends JpaRepository<NotificationOrder, Integer> {

    List<NotificationOrder> findAllByOrderByDateCreatedDesc();
}