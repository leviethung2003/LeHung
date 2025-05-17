package com.main.controller.restcontroller;

import com.main.dto.CartsDto;
import com.main.entity.Carts;
import com.main.entity.Products;
import com.main.entity.Users;
import com.main.service.CartService;
import com.main.service.ProductService;
import com.main.utils.EntityDtoUtils;
import com.main.utils.SessionAttr;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("api")
public class CartsAPI {

    @Autowired
    CartService cartService;

    @Autowired
    ProductService productService;

    @Autowired
    HttpSession session;

    @GetMapping("carts")
    public List<Object[]> getCarts() {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);

        if (users != null) {
            return cartService.findListCartByUserId(users.getId());
        } else {
            return Collections.emptyList();
        }
    }

    @GetMapping("carts/cart-interceptor")
    public boolean getCartAuthentication() {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);

        if (users != null) {
            List<Object[]> objects = cartService.findListCartByUserId(users.getId());
            return objects != null && !objects.isEmpty();
        } else {
            return false;
        }
    }

    // lấy ra tổng số lượng sản phẩm tronmg giỏ hàng
    @GetMapping("carts/quantity-cart")
    public Integer getQuantityCart() {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);

        if (users != null) {
            return cartService.countCartByUserId(users.getId());
        } else {
            return 0;
        }
    }

    // lấy ra cart bằng cartId
    @GetMapping("carts/get-by-id/{cardId}")
    public Carts getCartById(@PathVariable int cardId) {
        if (cardId != 0) {
            return cartService.findByCartId(cardId);
        } else {
            return null;
        }
    }

    @GetMapping("carts/productPriceByUserId")
    public List<Integer> getProductPriceList() {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);
        return productService.findPriceProductByUserId(users.getId());
    }

    // thêm vào giỏ hàng
    @PostMapping("carts/them-vao-gio-hang/{productId}&{quantity}")
    public void addProductIntoCart(@PathVariable String productId, @PathVariable int quantity) {
        CartsDto cartsDto = new CartsDto();

        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);
        Carts exitsCart = cartService.findProductExits(users.getId(), productId);
        Products products = productService.findProductByProductId(productId);

        if (exitsCart != null) {
            if (exitsCart.getQuantity() < products.getQuantity()) {
                if (quantity < products.getQuantity()) {
                    exitsCart.setQuantity(exitsCart.getQuantity() + quantity);
                    cartService.save(exitsCart);
                }
            }
        } else {
            cartsDto.setUserId(users.getId());
            cartsDto.setProductId(productId);
            cartsDto.setQuantity(quantity);
            Carts carts = EntityDtoUtils.convertToEntity(cartsDto, Carts.class);
            cartService.save(carts);
        }
    }

    @PostMapping("carts/update-quantity-cart")
    public void updateCartItem(@RequestParam("cardId") int cardId, @RequestParam("quantity") int quantity) {
        Carts carts = cartService.findByCartId(cardId);

        if (carts != null) {
            carts.setQuantity(quantity);
            cartService.save(carts);
        }
    }

    // xoá sản phẩm khỏi giỏ hàng
    @GetMapping("carts/xoa-gio-hang/{cartId}")
    public void deleteCart(@PathVariable int cartId) {
        cartService.delete(cartId);
    }
}
