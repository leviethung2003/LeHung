package com.main.controller.admin;

import com.main.dto.DiscountsDto;
import com.main.dto.ResponseObject;
import com.main.dto.SaleOffDto;
import com.main.entity.Discounts;
import com.main.entity.Products;
import com.main.entity.SaleOff;
import com.main.service.*;
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

import java.math.BigDecimal;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Controller
@RequestMapping("quan-tri/giam-gia-san-pham")
public class SaleOffController {

    @Autowired
    DiscountService discountService;

    @Autowired
    HttpServletRequest request;

    @Autowired
    HttpSession session;

    @Autowired
    SaleOffService saleOffService;

    @Autowired
    ProductService productService;

    @GetMapping
    public String showDiscount(Model model) {
        model.addAttribute("listProductSaleOff", saleOffService.findAll());
        return "views/admin/page/views/sale-off-list";
    }

    @GetMapping("them-giam-gia-san-pham")
    public String showAddDiscount(@ModelAttribute SaleOffDto saleOffDto,
                                  Model model) {
        model.addAttribute("saleOffDto", saleOffDto);
        model.addAttribute("productIdValue", productService.findAll());
        return "views/admin/page/crud/sale-off/sale-off";
    }

    @GetMapping("them-giam-gia-san-pham/{id}")
    @ResponseBody
    public ResponseObject findIdProduct(@PathVariable("id") String id) {
        ResponseObject responseObject = new ResponseObject();
        SaleOff saleOff;

        if (productService.doesProductExist(id)) {
            if (saleOffService.doseExitsProductId(id)) {
                saleOff = saleOffService.findByProductId(id);

                responseObject = new ResponseObject("200", "Đã tìm thấy thông tin sản phẩm", saleOff);
            } else {
                responseObject = new ResponseObject("200", "Đã tìm thấy thông tin sản phẩm", null);
            }
        } else {
            responseObject = new ResponseObject("404", "Lỗi không tìm thấy sản phẩm", null);
        }

        return responseObject;
    }

    @PostMapping("them-giam-gia-san-pham")
    @ResponseBody
    public ResponseObject showAddDiscount(@Validated @ModelAttribute SaleOffDto saleOffDto,
                                          BindingResult bindingResult) {
        ResponseObject responseObject = null;
        String saleValue = request.getParameter("saleValue");
        boolean doesProductExist = productService.doesProductExist(saleOffDto.getProductId());

        saleOffDto.setSaleValue(ReplaceUtils.replacePrice(saleValue));

        System.out.println("Sản phẩm: " + doesProductExist);
        System.out.println(saleOffDto.toString());
        System.out.println(saleOffDto.getProductId());


        if (bindingResult.hasErrors() && saleOffDto.getSaleValue() == null) {
            responseObject = new ResponseObject("400", "Lỗi, vui lòng kiểm tra lại dữ liệu!", bindingResult.getSuppressedFields());
            return responseObject;

        } else if (!doesProductExist) {
            responseObject = new ResponseObject("404", "Lỗi, Thông tin sản phẩm không tồn tại!", null);
            return responseObject;

        } else {
            // Nếu id product có tồn tại
            if (!saleOffService.doseExitsProductId(saleOffDto.getProductId())) {
                LocalDateTime currentDateTime = LocalDateTime.now();
                int result = currentDateTime.compareTo(saleOffDto.getEndUse());

                if (result < 0) {
                    saleOffDto.setIsActive(true);
                } else {
                    saleOffDto.setIsActive(false);
                }

                saleOffDto.setSaleValue(ReplaceUtils.replacePrice(saleValue));
                SaleOff saleOff = EntityDtoUtils.convertToEntity(saleOffDto, SaleOff.class);
                System.out.println(saleOffDto.getIsActive());
                saleOffService.save(saleOff);
                responseObject = new ResponseObject("200", "Thêm giảm giá thành công!", null);
                return responseObject;
            } else {
                saleOffDto.setId(saleOffService.findByProductId(saleOffDto.getProductId()).getId());

                LocalDateTime currentDateTime = LocalDateTime.now();
                int result = currentDateTime.compareTo(saleOffDto.getEndUse());

                if (result < 0) {
                    saleOffDto.setIsActive(true);
                } else {
                    saleOffDto.setIsActive(false);
                }

                saleOffDto.setSaleValue(ReplaceUtils.replacePrice(saleValue));
                SaleOff saleOff = EntityDtoUtils.convertToEntity(saleOffDto, SaleOff.class);
                System.out.println(saleOffDto.getIsActive());
                saleOffService.save(saleOff);
                responseObject = new ResponseObject("201", "Sửa giảm giá thành công!", null);
                return responseObject;
            }
        }
    }

    @GetMapping("them-giam-gia-san-pham/gia-san-pham/{productId}")
    @ResponseBody
    public ResponseObject showAddDiscount(@PathVariable("productId") String productId) {
        Products product = productService.findProductByProductId(productId);
        return new ResponseObject("200", "OK", product);
    }

    @GetMapping("/sua-giam-gia-san-pham/{id}")
    public String findEditIdProduct(@PathVariable("id") String id, Model model) {
        SaleOffDto saleOffDto = new SaleOffDto();
        model.addAttribute("productIdValue", productService.findAll());
        model.addAttribute("saleOffDto", saleOffDto);

        if (productService.doesProductExist(id)) {
            if (saleOffService.doseExitsProductId(id)) {
                SaleOff saleOff = saleOffService.findByProductId(id);
                model.addAttribute("saleOffValue", saleOff);
                model.addAttribute("price", productService.findByProductId(id).get().getPrice());
            } else {
                model.addAttribute("saleOffValue", null);
            }

            return "views/admin/page/crud/sale-off/sale-off-edit";
        } else {
            session.setAttribute("toastFailed", "Không tìm thấy thông tin sản phẩm");
            return "redirect:/quan-tri/giam-gia-san-pham";
        }
    }

    @GetMapping("/xoa-giam-gia-san-pham/{id}")
    public String deleteSaleOffIdProduct(@PathVariable("id") String id, Model model) {
        SaleOff saleOff = saleOffService.findByProductId(id);

        if (saleOff.getProductId() != null) {
            saleOffService.delete(saleOff);
            session.setAttribute("toastSuccess", "Xóa giảm giá thành công");
            return "redirect:/quan-tri/giam-gia-san-pham";
        } else {
            session.setAttribute("toastFailed", "Không tìm thấy thông tin sản phẩm");
            return "redirect:/quan-tri/giam-gia-san-pham";
        }
    }
}
