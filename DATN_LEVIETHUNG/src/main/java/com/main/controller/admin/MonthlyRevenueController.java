package com.main.controller.admin;

import com.main.service.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("quan-tri/doanh-thu-thang")
public class MonthlyRevenueController {

    @Autowired
    private RevenueService revenueService;

    @GetMapping()
    public String getShow(Model model) {
        // Lấy tháng hiện tại
        Calendar calendar = Calendar.getInstance();
        int month = calendar.get(Calendar.MONTH) + 1;
        int year = calendar.get(Calendar.YEAR);

        // Lấy dữ liệu doanh thu hàng tháng
        Optional<Object> monthlyRevenueDto = revenueService.MonthlyRevenue(month, year);

        // Thêm dữ liệu doanh thu hàng tháng vào mô hình
        model.addAttribute("monthlyRevenue", monthlyRevenueDto.get());
        model.addAttribute("statisticsOfBestSellingProducts", revenueService.findProductSalesInfoByMonthAndYear(month, year));
        model.addAttribute("calculateTotalYearlyAverageRevenue", revenueService.calculateTotalYearlyAverageRevenue(year));

        Object[] monthlyRevenue = (Object[]) monthlyRevenueDto.get();
        BigDecimal revenueChange = (BigDecimal) monthlyRevenue[1]; // Giả sử [1] là phần trăm thay đổi

        String trendIconClass;
        if (revenueChange != null) {
            if (revenueChange.compareTo(BigDecimal.ZERO) < 0) {
                trendIconClass = "ti ti-arrow-down-right text-danger";
            } else {
                trendIconClass = "ti ti-arrow-up-left text-success";
            }
            model.addAttribute("trendIconClass", trendIconClass);
        } else {
            model.addAttribute("trendIconClass", "ti ti-arrow-down-right text-danger");
        }

        return "views/admin/page/views/doanh-thu-thang";
    }


    @ModelAttribute("selectYear")
    public List<Integer> filterOrdersByUniqueYear() {
        return revenueService.findDistinctOrdersByYear();
    }

}
