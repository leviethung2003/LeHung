package com.main.service.impl;

import com.main.entity.UserDiscounts;
import com.main.repository.UserDiscountsRepository;
import com.main.service.UserDiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDiscountServiceImpl implements UserDiscountService {

    @Autowired
    UserDiscountsRepository userDiscountsRepository;

    @Override
    public List<UserDiscounts> findAll() {
        return userDiscountsRepository.findAll();
    }

    @Override
    public UserDiscounts findByUserIdAndDiscountI(int userId, String discountId) {
        return userDiscountsRepository.findByUserIdAndDiscountId(userId, discountId);
    }

    @Override
    public UserDiscounts save(UserDiscounts userDiscounts) {
        return userDiscountsRepository.save(userDiscounts);
    }
}
