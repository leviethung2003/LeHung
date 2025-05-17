package com.main.controller.admin;

import com.main.dto.ProductTypesDto;
import com.main.entity.ProductCategories;
import com.main.entity.ProductTypes;
import com.main.service.ProductCategoryService;
import com.main.service.ProductTypeService;
import com.main.utils.EntityDtoUtils;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("quan-tri/the-loai")
public class ProductTypeControllerAD {

    @Autowired
    ProductTypeService productTypeService;

    @Autowired
    ProductCategoryService productCategoryService;

    @Autowired
    HttpSession session;

    @GetMapping
    public String product_types(Model model) {
        model.addAttribute("product_types", productTypeService.findAll());
        return "views/admin/page/views/product-type-list";
    }

    @GetMapping("them-the-loai")
    public String show_product_types_add(Model model) {
        List<ProductCategories> categories = productCategoryService.findAll();

        model.addAttribute("productTypeDTO", new ProductTypesDto());
        model.addAttribute("categories", categories);
        return "views/admin/page/crud/product_type/product-type-add";
    }

    @GetMapping("sua-the-loai/{productTypeId}")
    public String show_product_types_edit(@PathVariable int productTypeId, Model model) {
        ProductTypes productTypes = productTypeService.findById(productTypeId);
        List<ProductCategories> categories = productCategoryService.findAll();

        model.addAttribute("product_types", productTypes);
        model.addAttribute("categories", categories);
        return "views/admin/page/crud/product_type/product-type-edit";
    }

    @PostMapping("them-the-loai/submit")
    public String insert_product_types(@ModelAttribute ProductTypesDto productTypeDTO, RedirectAttributes redirectAttributes) {
        List<ProductTypes> productTypes = productTypeService.findAll();
        for (var productType : productTypes) {
            if (productType.getProductTypeName().equals(productTypeDTO.getProductTypeName())) {
                redirectAttributes.addFlashAttribute("errorProductType", "Thể loại đã tồn tại!");
                return "redirect:/quan-tri/the-loai/them-the-loai";
            }
        }
        productTypeDTO.setIsActive(Boolean.TRUE);
        ProductTypes save = EntityDtoUtils.convertToEntity(productTypeDTO, ProductTypes.class);
        productTypeService.save(save);

        session.setAttribute("toastSuccess", "Thêm thể loại thành công !");
        return "redirect:/quan-tri/the-loai";

    }

    @PostMapping("sua-the-loai/{productTypeId}")
    public String update_product_types(@PathVariable("productTypeId") int id,
                                       @ModelAttribute ProductTypesDto productTypeDTO,
                                       RedirectAttributes redirectAttributes) {
        List<ProductTypes> productTypes = productTypeService.findAll();
        productTypeDTO.setId(id);
        ProductTypes save = EntityDtoUtils.convertToEntity(productTypeDTO, ProductTypes.class);
        productTypeService.save(save);

        session.setAttribute("toastSuccess", "Cập nhật thể loại thành công !");
        return "redirect:/quan-tri/the-loai";
    }

    @GetMapping("xoa-the-loai/{id}")
    public String delete_product_type(@PathVariable int id) {
        ProductTypes productTypes = productTypeService.findById(id);
        productTypes.setIsActive(Boolean.FALSE);
        productTypeService.save(productTypes);

        session.setAttribute("toastSuccess", "Xoá thể loại thành công !");
        return "redirect:/quan-tri/the-loai";
    }
}