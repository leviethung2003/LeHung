package com.main.service;

import com.main.dto.RevenueDto;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface RevenueService {
    double calculateRevenueForYear(int year);

    List<Object[]> getOrdersByCreatedAt_Year(int year);

    List<Integer> findDistinctOrdersByYear();

    List<Integer> calculateAverageRevenue();

    List<Object> findTopSellingProducts(int parameter);

    List<RevenueDto> getRevenueByYear(int year);

    BigDecimal calculateDailyRevenue(Integer inputDay, Integer inputMonth, Integer inputYear);

    Optional<Object> MonthlyRevenue(Integer inputMonth, Integer inputYear);

    List<Object> findProductSalesInfoByMonthAndYear(int month, int year);

    BigDecimal calculateTotalYearlyAverageRevenue(int year);
}
