package com.main.repository;

import com.main.entity.Discounts;
import com.main.entity.SaleOff;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface DiscountRepository extends JpaRepository<Discounts, String> {

    Page<Discounts> findAllByOrderByStartUseDesc(Pageable pageable);

    List<Discounts> findByEndUseBeforeAndIsActiveTrue(LocalDateTime endUse);
}
