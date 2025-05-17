package com.main.controller.admin;

import com.main.dto.ProductBrandsDto;
import com.main.entity.ProductBrands;
import com.main.service.ProductBrandService;
import com.main.service.ProductService;
import com.main.service.ProductTypeService;
import com.main.utils.EntityDtoUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("quan-tri/danh-sach-thuong-hieu")
public class BrandControllerAD {
    @Autowired
    ProductService productsService;

    @Autowired
    ProductBrandService productBrandService;

    @Autowired
    HttpServletRequest request;

    @Autowired
    HttpSession session;

    @Autowired
    ProductTypeService productTypeService;

    @RequestMapping()
    public String showBrands(Model model) {
        model.addAttribute("listProductBrand", productBrandService.findAll());
        return "views/admin/page/views/brands";
    }

    @GetMapping("them-thuong-hieu")
    public String showAddBrands(@ModelAttribute ProductBrandsDto productBrandsDto, Model model) {
        model.addAttribute("productBrandsDto", productBrandsDto);
        return "views/admin/page/crud/brand/brand-add";
    }

    @PostMapping("them-thuong-hieu")
    public String saveBrands(@ModelAttribute ProductBrandsDto productBrandsDto, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("isStatusDelete", "Đang hoạt động");
            return "views/admin/page/crud/brand/brand-add";
        } else {
            productBrandsDto.setId(brandIdValue());
            productBrandsDto.setIsStatusDelete("Đang hoạt động");
            ProductBrands saveBrands = EntityDtoUtils.convertToEntity(productBrandsDto, ProductBrands.class);

            productBrandService.save(saveBrands);
            session.setAttribute("toastSuccess", "Thêm thương hiệu thành công !");
            return "redirect:/quan-tri/danh-sach-thuong-hieu/them-thuong-hieu";
        }
    }

    @GetMapping("sua-thuong-hieu/{id}")
    public String showEditBrand(@ModelAttribute ProductBrandsDto productBrandsDto,
                                @PathVariable("id") String id,
                                Model model) {
        model.addAttribute("productBrandsDto", productBrandsDto);
        model.addAttribute("infoBrand", productBrandService.findByProductBrandId(id));
        return "views/admin/page/crud/brand/brand-edit";
    }

    @PostMapping("sua-thuong-hieu/{id}")
    public String saveEditBrands(@ModelAttribute ProductBrandsDto productBrandsDto,
                                 @PathVariable("id") String id,
                                 BindingResult bindingResult, Model model) {
        Optional<ProductBrands> brands = Optional.of(productBrandService.findByProductBrandId(id));
        if (bindingResult.hasErrors()) {
            model.addAttribute("brand", brands);
            return "views/admin/page/crud/brand/brand-edit";
        } else {
            if (brands.isPresent()) {
                ProductBrands save = EntityDtoUtils.convertToEntity(productBrandsDto, ProductBrands.class);
                productBrandsDto.setId(id);
                productBrandService.save(save);
                model.addAttribute("brand", brands);
                session.setAttribute("toastSuccess", "Cập nhật thành công");
                return "redirect:/quan-tri/danh-sach-thuong-hieu";
            } else {
                session.setAttribute("toastFailed", "Mã thương hiệu không tồn tại");
                return "views/admin/page/crud/brand/brand-edit";
            }

        }
    }

    @GetMapping("xoa-thuong-hieu/{id}")
    public String deleteBrands(@PathVariable("id") String id) {
        boolean brandsExist = productBrandService.doesProductBrandExist(id);

        if (brandsExist) {
            ProductBrands brands = productBrandService.findByProductBrandId(id);
            brands.setIsStatusDelete("Ngưng hoạt động");

            productBrandService.save(brands);
            session.setAttribute("toastSuccess", "Xóa thương hiệu thành công");
            return "redirect:/quan-tri/danh-sach-thuong-hieu";
        } else {
            session.setAttribute("toastFailed", "Mã thương hiệu không tồn tại");
            return "redirect:/quan-tri/danh-sach-thuong-hieu";
        }
    }

    @ModelAttribute("brandsIdValue")
    public String brandIdValue() {
        List<ProductBrands> brandsList;
        brandsList = productBrandService.findAll();
        String brandId;
        if (brandsList.isEmpty()) {
            brandId = "BR001";
            return brandId;
        } else {
            String input = brandsList.get(brandsList.size() - 1).getId();
            String prefix = input.substring(0, 2);
            int number = Integer.parseInt(input.substring(2));
            number++;
            String newNumber = String.format("%03d", number);

            brandId = prefix + newNumber;
        }

        if (productBrandService.doesProductBrandExist(brandId)) {
            String prefix = brandId.substring(0, 2);
            int number = Integer.parseInt(brandId.substring(2));
            String newNumber = String.format("%04d", number + 1);
            brandId = prefix + newNumber;
            return brandId;
        } else {
            return brandId;
        }
    }

    @ModelAttribute("isStatusDeleteProductBrandValue")
    public List<String> isStatusDeleteProductBrandValue() {
        List<String> listStatus = new ArrayList<>();
        List<String> additionalList = Arrays.asList("Đang hoạt động", "Ngưng hoạt động");
        listStatus.addAll(additionalList);
        return listStatus;
    }
}
