package com.main.components;

import com.main.service.DiscountService;
import com.main.service.SaleOffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {
    @Autowired
    SaleOffService saleOffService;

    @Autowired
    DiscountService discountService;

    @Scheduled(fixedDelay = 1000)
    public void checkDiscountStatus() {
        saleOffService.updateSalsOffStatus();
    }

    @Scheduled(fixedDelay = 1000)
    public void checkDiscountEnd() {
        discountService.updateDiscountOffStatus();
    }

}
