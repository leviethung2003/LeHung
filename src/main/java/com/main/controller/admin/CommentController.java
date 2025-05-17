package com.main.controller.admin;

import com.main.service.BannerWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("quan-tri/binh-luan")
public class CommentController {

    @Autowired
    BannerWordService bannerWordService;

    @GetMapping
    public String product_comment(Model model) {
        model.addAttribute("Comments", bannerWordService.findAll());
        return "views/admin/page/views/banner-word-list";
    }
}
