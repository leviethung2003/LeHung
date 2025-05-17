package com.main.service.impl;

import com.main.entity.Discounts;
import com.main.entity.SaleOff;
import com.main.repository.DiscountRepository;
import com.main.service.DiscountService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DiscountServiceImpl implements DiscountService {

    @Autowired
    DiscountRepository repo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<Discounts> findAll() {
        return repo.findAll();
    }

    @Override
    public Page<Discounts> findAll(Pageable pageable) {
        return repo.findAllByOrderByStartUseDesc(pageable);
    }

    @Override
    public Discounts findById(String discountID) {
        return repo.getReferenceById(discountID);
    }

    @Override
    public void save(Discounts discount) {
        repo.save(discount);
    }

    @Override
    public Discounts delete(String discount) {
        Discounts discounts = findById(discount);
        discounts.setIsActive(false);
        return repo.save(discounts);
    }

    @Override
    public void updateDiscountOffStatus() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        List<Discounts> discountList = repo.findByEndUseBeforeAndIsActiveTrue(currentDateTime);

        for (Discounts discounts : discountList){
            discounts.setIsActive(false);
            repo.save(discounts);
        }
    }
}
