package com.main.service;

import com.main.entity.Carts;

import java.util.List;

public interface CartService {

    List<Object[]> findListCartByUserId(int userId);

    Carts findProductExits(int userId, String productId);

    Carts findByCartId(int userId);

    Integer countCartByUserId(int userId);

    Carts save(Carts carts);

    void delete(int cartId);
}
