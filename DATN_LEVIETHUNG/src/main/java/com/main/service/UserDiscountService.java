package com.main.service;

import com.main.entity.UserDiscounts;

import java.util.List;

public interface UserDiscountService {

    List<UserDiscounts> findAll();

    UserDiscounts findByUserIdAndDiscountI(int userId, String discountId);

    UserDiscounts save(UserDiscounts userDiscounts);
}
