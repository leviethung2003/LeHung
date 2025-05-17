package com.main.controller.restcontroller;

import com.main.entity.Orders;
import com.main.service.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("api")
public class MonthlyRevenueAPI {

    @Autowired
    private RevenueService revenueService;

    @GetMapping("/quan-tri/doanh-thu-thang/revenueDays")
    public BigDecimal calculateDailyRevenue(
            @RequestParam Integer day,
            @RequestParam Integer month,
            @RequestParam Integer year) {

        BigDecimal calculateDailyRevenue = revenueService.calculateDailyRevenue(day, month, year);
        if (calculateDailyRevenue == null) {
            calculateDailyRevenue = BigDecimal.valueOf(0);
        }
        return calculateDailyRevenue;
    }

    @GetMapping("/quan-tri/doanh-thu-thang/revenueMonth")
    public ResponseEntity<Map<String, Object>> getRevenueByMonth(
            @RequestParam Integer month,
            @RequestParam Integer year) {
        Map<String, Object> response = new HashMap<>();

        // Lấy dữ liệu doanh thu hàng tháng
        Optional<Object> monthlyRevenueDto = revenueService.MonthlyRevenue(month, year);

        // Thêm dữ liệu doanh thu hàng tháng vào mô hình
        response.put("monthlyRevenue", monthlyRevenueDto.get());
        response.put("statisticsOfBestSellingProducts", revenueService.findProductSalesInfoByMonthAndYear(month, year));
        response.put("calculateTotalYearlyAverageRevenue", revenueService.calculateTotalYearlyAverageRevenue(year));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
