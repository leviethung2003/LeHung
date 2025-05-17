package com.main.repository;


import com.main.entity.SaleOff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SaleOffRepository extends JpaRepository<SaleOff, Integer> {
    SaleOff findByProductId(String id);

    boolean existsByProductId(String id);

    List<SaleOff> findByEndUseBeforeAndIsActiveTrue(LocalDateTime endUse);
}
