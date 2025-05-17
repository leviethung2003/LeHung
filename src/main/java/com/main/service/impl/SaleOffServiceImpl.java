package com.main.service.impl;

import com.main.entity.SaleOff;
import com.main.repository.SaleOffRepository;
import com.main.service.SaleOffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SaleOffServiceImpl implements SaleOffService {
    @Autowired
    SaleOffRepository saleOffRepository;

    @Override
    public List<SaleOff> findAll() {
        return saleOffRepository.findAll();
    }

    @Override
    public SaleOff findByProductId(String id) {
        return saleOffRepository.findByProductId(id);
    }

    @Override
    public SaleOff findById(Integer id) {
        return null;
    }

    @Override
    public void save(SaleOff saleOff) {
        saleOffRepository.save(saleOff);
    }

    @Override
    public boolean doseExitsProductId(String id) {
        return saleOffRepository.existsByProductId(id);
    }

    @Override
    public void updateSalsOffStatus() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        List<SaleOff> saleOffList = saleOffRepository.findByEndUseBeforeAndIsActiveTrue(currentDateTime);

        for (SaleOff saleOff : saleOffList) {
            saleOff.setIsActive(false);
            saleOffRepository.save(saleOff);
        }

    }

    @Override
    public void delete(SaleOff saleOff) {
        saleOffRepository.delete(saleOff);
    }
}
