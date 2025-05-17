package com.main.controller.admin;

import com.main.dto.ProductCategoriesDto;
import com.main.entity.ProductCategories;
import com.main.service.ProductCategoryService;
import com.main.utils.EntityDtoUtils;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Controller
@RequestMapping("quan-tri/danh-muc")
public class CategoryControllerAD {

    @Autowired
    ProductCategoryService productCategoryService;

    @Autowired
    HttpSession session;

    @GetMapping
    public String categories(Model model) {
        model.addAttribute("categories", productCategoryService.findAll());
        return "views/admin/page/views/categorys-list";
    }

    @GetMapping("them-danh-muc")
    public String categorys_add(Model model) {
        model.addAttribute("categoryDto", new ProductCategoriesDto());
        return "views/admin/page/crud/category/categorys-add";
    }

    @GetMapping("sua-danh-muc/{categoryId}")
    public String categorys_edit(@PathVariable int categoryId, Model model) {
        ProductCategories categories = productCategoryService.findById(categoryId);

        model.addAttribute("categories", categories);
        return "views/admin/page/crud/category/categorys-edit";
    }

    @PostMapping("them-danh-muc/submit")
    public String addFormCategory(ProductCategoriesDto categoryDTO, @RequestParam("img") MultipartFile file) {
        if (isCategoryNameExists(categoryDTO.getCategoryName())) {
            session.setAttribute("toastWarning", "Tên danh mục đã tồn tại!");
            return "redirect:/quan-tri/danh-muc/them-danh-muc";
        }

        if (!file.isEmpty()) {
            Path path = Paths.get("src/main/resources/static/upload/");

            if (!path.toFile().exists()) {
                path.toFile().mkdirs();
            }
            try {
                InputStream inputStream = file.getInputStream();
                Files.copy(inputStream, path.resolve(file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        categoryDTO.setCategoryImage(file.getOriginalFilename());
        categoryDTO.setIsActive(Boolean.TRUE);
        ProductCategories categories = EntityDtoUtils.convertToEntity(categoryDTO, ProductCategories.class);
        productCategoryService.save(categories);
        session.setAttribute("toastSuccess", "Thêm danh mục thành công!");
        return "redirect:/quan-tri/danh-muc";
    }

    @PostMapping("sua-danh-muc/{categoryId}")
    public String updateFormCategory(@PathVariable int categoryId, ProductCategoriesDto categoryDTO, @RequestParam("img") MultipartFile file) {
        if (!file.isEmpty()) {
            Path path = Paths.get("src/main/resources/static/upload/");

            if (!path.toFile().exists()) {
                path.toFile().mkdirs();
            }
            try {
                InputStream inputStream = file.getInputStream();
                Files.copy(inputStream, path.resolve(file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        categoryDTO.setId(categoryId);
        categoryDTO.setCategoryImage(file.getOriginalFilename());
        categoryDTO.setIsActive(categoryDTO.getIsActive());
        ProductCategories categories = EntityDtoUtils.convertToEntity(categoryDTO, ProductCategories.class);
        productCategoryService.save(categories);
        session.setAttribute("toastSuccess", "Cập nhật thành công!");
        return "redirect:/quan-tri/danh-muc";
    }

    @GetMapping("xoa-danh-muc/{categoryId}")
    public String delete_categorys(@PathVariable int categoryId) {
        ProductCategories categories = productCategoryService.findById(categoryId);
        categories.setIsActive(Boolean.FALSE);
        productCategoryService.save(categories);

        session.setAttribute("toastSuccess", "Xoá danh mục thành công!");
        return "redirect:/quan-tri/danh-muc";
    }

    public boolean isCategoryNameExists(String categoryName) {
        ProductCategories categories = productCategoryService.existsByCategoryName(categoryName);
        return categories != null;
    }
}