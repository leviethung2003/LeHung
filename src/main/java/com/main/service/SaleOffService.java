package com.main.service;


import com.main.entity.SaleOff;

import java.util.List;

public interface SaleOffService {
    List<SaleOff> findAll();

    SaleOff findByProductId(String id);

    SaleOff findById(Integer id);

    void save(SaleOff saleOff);

    boolean doseExitsProductId(String id);

    void updateSalsOffStatus();

    void delete(SaleOff saleOff);
}
