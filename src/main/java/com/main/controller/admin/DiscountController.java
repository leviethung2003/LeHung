package com.main.controller.admin;

import com.main.dto.DiscountsDto;
import com.main.entity.Discounts;
import com.main.service.EmailService;
import com.main.service.UserDiscountService;
import com.main.service.DiscountService;
import com.main.utils.DiscountCodeGeneratoUtils;
import com.main.utils.EntityDtoUtils;
import com.main.utils.ReplaceUtils;
import com.main.utils.SessionUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Controller
@RequestMapping("quan-tri/giam-gia")
public class DiscountController {

    @Autowired
    DiscountService discountService;

    @Autowired
    UserDiscountService userDiscountService;

    @Autowired
    HttpServletRequest request;

    @Autowired
    HttpSession session;

    @Autowired
    EmailService emailService;

    LocalDateTime currentDateTime = LocalDateTime.now();

    @GetMapping
    public String showDiscount(Model model) {
        model.addAttribute("discountCodes", discountService.findAll());
        return "views/admin/page/views/discouts-list";
    }

    @GetMapping("danh-sach-ma-giam-gia-da-sua-dung")
    public String showAccountDiscountCode(Model model) {
        model.addAttribute("accounts", discountService.findAll());
        model.addAttribute("accountDiscountCodeList", userDiscountService.findAll());
        return "views/admin/page/views/apply-discouts-list";
    }

    @GetMapping("them-ma")
    public String showAddDiscount(Model model) {
        model.addAttribute("discountCodesDTO", new DiscountsDto());
        model.addAttribute("discountCodeValue", DiscountCodeGeneratoUtils.generateDiscountCode());
        return "views/admin/page/crud/discout/discout-add";
    }

    @PostMapping("them-ma/save")
    public String saveDiscountCode(@Validated DiscountsDto discountCodesDTO, BindingResult result, Model model) {
        String price = request.getParameter("price");

        if (discountCodesDTO.getEndUse().isBefore(discountCodesDTO.getStartUse())) {
            result.rejectValue("endUse", null, "Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
            return "views/admin/page/crud/discout/discout-add";
        }

        if (result.hasErrors()) {
            model.addAttribute("discountCodeValue", DiscountCodeGeneratoUtils.generateDiscountCode());
            return "views/admin/page/crud/discout/discout-add";
        }

        discountCodesDTO.setIsActive(Boolean.TRUE);
        discountCodesDTO.setDiscountCost(ReplaceUtils.replacePrice(price));
        Discounts save = EntityDtoUtils.convertToEntity(discountCodesDTO, Discounts.class);
        discountService.save(save);

        //nếu ngày hết hạn nhỏ hơn ngày hiện tại thì gửi thư, hông thì thôi
        int comp = currentDateTime.compareTo(discountCodesDTO.getEndUse());
        if (comp < 0) {
            emailService.queueEmailNotice(discountCodesDTO);
        }

        SessionUtils.setAttribute("toastSuccess", "Thêm mã giảm giá thành công!");
        return "redirect:/quan-tri/giam-gia";
    }

    @RequestMapping("sua-ma/{id}")
    public String showAddDiscout(@ModelAttribute DiscountsDto discountCodesDTO, @PathVariable("id") String id, Model model) {
        Discounts discountCodes = discountService.findById(id);

        discountCodesDTO.setIsActive(discountCodes.getIsActive());
        model.addAttribute("discountCodesDTO", discountCodesDTO);
        model.addAttribute("discountValue", discountCodes);
        model.addAttribute("discountPriceEdit", ReplaceUtils.formatPrice(discountCodes.getDiscountCost()));
        return "views/admin/page/crud/discout/discout-edit";
    }

    @PostMapping("sua-ma/save/{id}")
    public String showEditDiscount(@Validated @ModelAttribute DiscountsDto discountCodesDTO, BindingResult result, @PathVariable("id") String id, Model model) {
        String price = request.getParameter("discountPriceEdit");

        if (!result.hasErrors()) {
            if (discountCodesDTO.getEndUse().isBefore(discountCodesDTO.getStartUse())) {
                result.rejectValue("errorDate", null, "Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
                return "views/admin/page/crud/discout/discout-edit";
            } else {
                discountCodesDTO.setId(id);
                if (discountCodesDTO.getId() != null) {
                    int com = currentDateTime.compareTo(discountCodesDTO.getEndUse());
                    if (com < 0) {
                        discountCodesDTO.setIsActive(true);
                    } else {
                        discountCodesDTO.setIsActive(false);
                    }

                    discountCodesDTO.setDiscountCost(ReplaceUtils.replacePrice(price));
                    Discounts discount = EntityDtoUtils.convertToEntity(discountCodesDTO, Discounts.class);
                    discountService.save(discount);
                }

                SessionUtils.setAttribute("toastSuccess", "Sửa mã giảm giá thành công!");
                return "redirect:/quan-tri/giam-gia";
            }
        } else {
            model.addAttribute("discountCodeValue", DiscountCodeGeneratoUtils.generateDiscountCode());
            return "views/admin/page/crud/discout/discout-edit";
        }
    }

    @GetMapping("xoa-ma/{id}")
    public String deleteDiscout(@PathVariable String id) {
        Discounts discounts = discountService.findById(id);
        discounts.setQuantity(0);
        discountService.save(discounts);

        session.setAttribute("toastSuccess", "Xoá mã giảm giá thành công !");
        return "redirect:/quan-tri/giam-gia";
    }

}
