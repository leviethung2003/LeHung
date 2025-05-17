package com.main.service.impl;

import com.main.entity.Carts;
import com.main.repository.CartsRepository;
import com.main.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    CartsRepository cartsRepository;

    @Override
    public List<Object[]> findListCartByUserId(int userId) {
        return cartsRepository.findAllCartByUserId(userId);
    }

    @Override
    public Carts findProductExits(int userId, String productId) {
        return cartsRepository.findByUserIdAndProductId(userId, productId);
    }

    @Override
    public Carts findByCartId(int cartId) {
        return cartsRepository.getReferenceById(cartId);
    }

    @Override
    public Integer countCartByUserId(int userId) {
        return cartsRepository.countByAccountId(userId);
    }

    @Override
    public Carts save(Carts carts) {
        return cartsRepository.save(carts);
    }

    @Override
    public void delete(int cartId) {
        Carts carts = cartsRepository.getReferenceById(cartId);
        cartsRepository.delete(carts);
    }
}
