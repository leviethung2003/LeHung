package com.main.controller.restcontroller;

import com.main.entity.Discounts;
import com.main.entity.UserDiscounts;
import com.main.entity.Users;
import com.main.service.DiscountService;
import com.main.service.UserDiscountService;
import com.main.utils.SessionAttr;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("api")
public class DiscountAPI {

    @Autowired
    DiscountService discountService;

    @Autowired
    UserDiscountService userDiscountService;

    @Autowired
    HttpSession session;

    @GetMapping("discount")
    private List<Discounts> findAllDiscount() {
        return discountService.findAll();
    }

    @GetMapping("discount/{discount_code}")
    private Discounts findDiscountByDiscountCode(@PathVariable String discount_code) {
        return discountService.findById(discount_code);
    }

    @GetMapping("discount/user-discount/{userId}/{discountId}")
    private boolean hasUserDiscount(@PathVariable int userId, @PathVariable String discountId) {
        UserDiscounts userDiscount = userDiscountService.findByUserIdAndDiscountI(userId, discountId);
        return userDiscount != null;
    }

    @PostMapping("discount/decrease_quantity/{discountId}")
    private void decreaseQuantity(@PathVariable String discountId) {
        Discounts discounts = discountService.findById(discountId);
        discounts.setQuantity(discounts.getQuantity() - 1);
        discountService.save(discounts);

        // lưu user nào dùng mã giảm giá nào
        createUserDiscount(discountId);
    }

    private void createUserDiscount(String discountId) {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);

        UserDiscounts userDiscounts = new UserDiscounts();
        userDiscounts.setUserId(users.getId());
        userDiscounts.setDiscountId(discountId);
        userDiscounts.setUsedAt(new Timestamp(System.currentTimeMillis()));
        userDiscountService.save(userDiscounts);
    }
}
