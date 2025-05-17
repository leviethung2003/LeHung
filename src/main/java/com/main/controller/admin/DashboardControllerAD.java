package com.main.controller.admin;

import com.main.entity.Orders;
import com.main.entity.Users;
import com.main.service.RevenueService;
import com.main.service.UserService;
import com.main.utils.SessionAttr;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("quan-tri/dashboard")
public class DashboardControllerAD {

    @Autowired
    private RevenueService revenueService;

    @Autowired
    private UserService userService;

    @Autowired
    private HttpSession session;

    // Phương thức chính để hiển thị trang doanh thu năm
    @GetMapping()
    public String doanhThuNam(@RequestParam(name = "year", defaultValue = "2023") int year, Model model, Principal principal) {
        String email = principal.getName();
        double revenue = getSafeRevenue(year);
        double revenueLastYear = getSafeRevenue(year - 1);
        updateModelForRevenueComparison(model, revenue, revenueLastYear);

        model.addAttribute("year", year);
        model.addAttribute("revenue", revenue);

        Users users = userService.findByEmail(email);
        session.setAttribute(SessionAttr.CURRENT_ADMIN, users);

        List<Object[]> ordersInYear = revenueService.getOrdersByCreatedAt_Year(year);
        model.addAttribute("profitData", getMonthlyProfitData(ordersInYear));

        model.addAttribute("percent", revenueService.calculateAverageRevenue());
        model.addAttribute("AverageRevenueByYear", revenueService.calculateAverageRevenue());
        model.addAttribute("topSellingProducts", revenueService.findTopSellingProducts(year));

        return "views/admin/page/views/doanh-thu-nam";
    }

    // Phương thức phụ trợ để lấy doanh thu an toàn
    private double getSafeRevenue(int year) {
        try {
            return revenueService.calculateRevenueForYear(year);
        } catch (Exception e) {
            return 0;
        }
    }

    // Phương thức phụ trợ để cập nhật model với dữ liệu so sánh doanh thu
    private void updateModelForRevenueComparison(Model model, double revenue, double revenueLastYear) {
        double percent = calculatePercentageChange(revenue, revenueLastYear);
        String muiTen = (revenue >= revenueLastYear) ? "ti-arrow-up-left text-success" : "ti-arrow-down-right text-danger";

        if (revenueLastYear == 0 && revenue != 0) {
            percent = 100;
            muiTen = "ti-arrow-up-left text-success";
        } else if (revenue == 0 && revenueLastYear != 0) {
            percent = -100;
            muiTen = "ti-arrow-down-right text-danger";
        } else if (revenue == revenueLastYear) {
            percent = 0;
            muiTen = "ti-arrow-up-left text-success";
        }

        model.addAttribute("muiTen", muiTen);
        model.addAttribute("percentCompareToLastYear", percent);
    }


    // Phương thức phụ trợ để tính toán phần trăm thay đổi
    private Double calculatePercentageChange(double newValue, double oldValue) {
        return ((newValue - oldValue) / oldValue) * 100;
    }

    // Phương thức phụ trợ để lấy dữ liệu lợi nhuận hàng tháng
    private List<BigDecimal> getMonthlyProfitData(List<Object[]> ordersInYear) {
        Map<Integer, BigDecimal> monthlyProfitMap = new HashMap<>();
        for (Object[] order : ordersInYear) {
            if (order[1] instanceof Orders ordersEntity) {
                LocalDateTime createdAt = ordersEntity.getDateCreated().toLocalDateTime();
                int month = createdAt.getMonthValue();
                BigDecimal totalAmount = BigDecimal.valueOf(((Number) order[0]).doubleValue());

                monthlyProfitMap.merge(month, totalAmount, BigDecimal::add);
            }
        }

        List<BigDecimal> profitData = new ArrayList<>();
        for (int month = 1; month <= 12; month++) {
            BigDecimal profit = monthlyProfitMap.getOrDefault(month, BigDecimal.ZERO);
            profitData.add(profit);
        }
        return profitData;
    }

    // Phương thức để tải biểu đồ doanh thu theo năm
    @GetMapping("load-bieu-do")
    public ResponseEntity<Map<String, Object>> getRevenueByYear(@RequestParam("year") int year) {
        Map<String, Object> response = new HashMap<>();

        double revenue = getSafeRevenue(year);
        double revenueLastYear = getSafeRevenue(year - 1);

        // Cập nhật response thay vì Model
        updateResponseForRevenueComparison(response, revenue, revenueLastYear);

        try {
            List<Object[]> ordersInYear = revenueService.getOrdersByCreatedAt_Year(year);
            List<BigDecimal> profitData = getMonthlyProfitData(ordersInYear);
            response.put("profitData", profitData);

        } catch (Exception e) {
            response.put("profitData", generateEmptyProfitData());
        }
        response.put("revenue", revenue);
        response.put("topSellingProducts", revenueService.findTopSellingProducts(year));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Phương thức mới để cập nhật Map
    private void updateResponseForRevenueComparison(Map<String, Object> response, double revenue, double revenueLastYear) {
        double percent = calculatePercentageChange(revenue, revenueLastYear);
        String muiTen = (revenue >= revenueLastYear) ? "ti-arrow-up-left text-success" : "ti-arrow-down-right text-danger";

        if (revenueLastYear == 0 && revenue != 0) {
            percent = 100;
            muiTen = "ti-arrow-up-left text-success";
        } else if (revenue == 0 && revenueLastYear != 0) {
            percent = -100;
            muiTen = "ti-arrow-down-right text-danger";
        } else if (revenue == revenueLastYear) {
            percent = 0;
            muiTen = "ti-arrow-up-left text-success";
        }
        response.put("muiTen", muiTen);
        response.put("percentCompareToLastYear", percent);
    }


    // Phương thức phụ trợ để tạo dữ liệu lợi nhuận rỗng
    private List<BigDecimal> generateEmptyProfitData() {
        List<BigDecimal> profitData = new ArrayList<>();
        for (int month = 1; month <= 12; month++) {
            profitData.add(BigDecimal.ZERO);
        }
        return profitData;
    }

    // Phương thức để lấy danh sách các năm có đơn đặt hàng
    @ModelAttribute("selectYear")
    public List<Integer> filterOrdersByUniqueYear() {
        return revenueService.findDistinctOrdersByYear();
    }
}