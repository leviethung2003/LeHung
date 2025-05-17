package com.main.service;

import com.main.entity.Discounts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DiscountService {
    List<Discounts> findAll();

    Page<Discounts> findAll(Pageable pageable);

    Discounts findById(String discountID);

    void save(Discounts discount);

    Discounts delete(String discount);

    void updateDiscountOffStatus();
}
