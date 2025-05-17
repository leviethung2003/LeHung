package com.main.service.impl;

import com.main.dto.RevenueDto;
import com.main.repository.OrderRepository;
import com.main.service.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RevenueServiceImpl implements RevenueService {

    @Autowired
    private OrderRepository orderRepository;

    public double calculateRevenueForYear(int year) {
        return orderRepository.calculateRevenueForYear(year);
    }

    @Override
    public List<Object[]> getOrdersByCreatedAt_Year(int year) {
        return orderRepository.getOrdersByCreatedAt_Year(year);
    }

    @Override
    public List<Integer> findDistinctOrdersByYear() {
        return orderRepository.findDistinctOrdersByYear();
    }

    @Override
    public List<Integer> calculateAverageRevenue() {
        return orderRepository.calculateAverageRevenue();
    }

    @Override
    public List<Object> findTopSellingProducts(int year) {
        return orderRepository.findTopSellingProducts(year);
    }

    @Override
    public List<RevenueDto> getRevenueByYear(int year) {
        List<Object[]> result = orderRepository.getRevenueByYear(year);
        List<RevenueDto> revenueList = new ArrayList<>();

        for (Object[] row : result) {
            int month = (int) row[0];
            BigDecimal revenue = (BigDecimal) row[1];
            revenueList.add(new RevenueDto(month, revenue));
        }

        return revenueList;
    }

    @Override
    public BigDecimal calculateDailyRevenue(Integer inputDay, Integer inputMonth, Integer inputYear) {
        return orderRepository.calculateDailyRevenue(inputDay, inputMonth, inputYear);
    }

    @Override
    public Optional<Object> MonthlyRevenue(Integer inputMonth, Integer inputYear) {
        return orderRepository.MonthlyRevenue(inputMonth, inputYear);
    }

    @Override
    public List<Object> findProductSalesInfoByMonthAndYear(int month, int year) {
        return orderRepository.findProductSalesInfoByMonthAndYear(month, year);
    }

    @Override
    public BigDecimal calculateTotalYearlyAverageRevenue(int year) {
        List<BigDecimal> monthlyAverages = orderRepository.calculateAverageMonthlyRevenue(year);
        return monthlyAverages.stream()
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
