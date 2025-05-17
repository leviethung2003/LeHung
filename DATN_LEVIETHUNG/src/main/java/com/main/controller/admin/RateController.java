package com.main.controller.admin;

import com.main.dto.ProductRateDto;
import com.main.dto.ResponseObject;
import com.main.entity.ProductRate;
import com.main.entity.Products;
import com.main.repository.ProductRateRepository;
import com.main.service.ProductRateService;
import com.main.service.ProductService;
import com.main.service.RateService;
import com.main.utils.EntityDtoUtils;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.*;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping("quan-tri/danh-gia")
public class RateController {

    @Autowired
    RateService rateService;

    @Autowired
    ProductService productService;

    @Autowired
    ProductRateService productRateService;

    @Autowired
    ProductRateRepository productRateRepository;

    @Autowired
    HttpSession session;

    @GetMapping
    public String product_rate(Model model) {
        model.addAttribute("listRate", rateService.findAll());
        model.addAttribute("listProduct", productService.findAll());
        return "views/admin/page/views/rate-list";
    }

    @GetMapping("chi-tiet-danh-gia/{rateId}")
    public String productRateList(@RequestParam("rateId") String rateId, Model model) {

        return "views/admin/page/crud/rate/rate-list-detals";
    }

    @ResponseBody
    @GetMapping("/findRateByProductId/{productId}")
    ResponseObject findRateByProductId(@PathVariable("productId") String productId) {
        System.out.println(productId);
        if (productService.findByProductId(productId).isEmpty()) {
            return new ResponseObject("200", "Sản phẩm không tồn tại", null);
        } else {
            List<Object[]> listProduct = productRateRepository.findRateByProductId(productId);
            if (null == listProduct) {
                return new ResponseObject("200", "Sản phẩm chưa có đánh giá", null);
            } else {
                List<Object[]> rawData = listProduct;

                Map<String, Map<String, Object>> reviewMap = new HashMap<>();

// Duyệt qua dữ liệu từ câu truy vấn và gộp ảnh dựa trên đánh giá
                for (Object[] data : rawData) {
                    String reviewId = (String) data[0]; // Index 0 là vị trí của cột reviewId trong mảng Object

                    // Kiểm tra xem đã tồn tại đánh giá trong map chưa
                    if (!reviewMap.containsKey(reviewId)) {
                        Map<String, Object> reviewData = new HashMap<>();
                        reviewData.put("reviewId", reviewId);
                        reviewData.put("userId", (int) data[1]); // Thêm các trường dữ liệu khác từ câu truy vấn
                        reviewData.put("productName", (String) data[2]);
                        reviewData.put("dateCreated", data[3]);
                        reviewData.put("content", (String) data[4]);
                        reviewData.put("rate", (int) data[5]);
                        reviewData.put("fullname", (String) data[6]);
                        reviewData.put("orderId", (String) data[8]);
                        reviewData.put("reviewStatus", (Boolean) data[9]);
                        // Thêm các trường dữ liệu khác tùy thuộc vào cấu trúc câu truy vấn của bạn

                        reviewMap.put(reviewId, reviewData);
                    }

                    // Kiểm tra xem có đủ phần tử trong mảng không trước khi truy cập
                    if (data.length > 7) {
                        // Thêm ảnh vào danh sách ảnh của đánh giá
                        List<String> imageList = (List<String>) reviewMap.get(reviewId).get("images");
                        if (imageList == null) {
                            imageList = new ArrayList<>();
                            reviewMap.get(reviewId).put("images", imageList);
                        }
                        String imagePath = (String) data[7]; // Index 7 là vị trí của cột imagePath trong mảng Object
                        if (imagePath != null) {
                            imageList.add(imagePath);
                        }
                    }
                }

// Chuyển đổi Map thành cấu trúc dữ liệu JSON
                List<Map<String, Object>> result = new ArrayList<>(reviewMap.values());

                return new ResponseObject("200", "OK", result);
            }
        }
    }

    @ResponseBody
    @GetMapping("/advScoreRate/{productId}")
    ResponseObject advScoreRate(@PathVariable("productId") String productId) {
        if (productRateRepository.findByProductId(productId).isEmpty()) {
            return new ResponseObject("200", "Sản phẩm không tồn tại", 0);
        } else {
            List<ProductRate> listProduct = productRateRepository.findByProductId(productId);
            DecimalFormat decimalFormat = new DecimalFormat("#.##");
            int score = 0;
            float rateScore = 0.0f;
            if (null == listProduct) {
                return new ResponseObject("200", "Sản phẩm chưa có đánh giá", 0);
            } else {
                for (ProductRate productRateDTO : listProduct) {
                    score += productRateDTO.getRate();
                }
                rateScore = (float) score / listProduct.size();

                return new ResponseObject("200", "OK", decimalFormat.format(rateScore));
            }
        }
    }

    @ResponseBody
    @GetMapping("/quailityRate/{productId}")
    ResponseObject quailityScoreRate(@PathVariable("productId") String productId) {
        if (productRateRepository.findRateByProductId(productId).isEmpty()) {
            return new ResponseObject("200", "Sản phẩm không tồn tại", 0);
        } else {
            List<ProductRate> listProduct = productRateRepository.findByProductId(productId);

            int score = 0;
            float rateScore = 0.0f;
            if (null == listProduct) {
                return new ResponseObject("200", "Sản phẩm chưa có đánh giá", 0);
            } else {
                return new ResponseObject("200", "OK", listProduct.size());
            }
        }
    }

    @ResponseBody
    @GetMapping("/getProductByProductId/{productId}")
    ResponseObject getProductByProductId(@PathVariable("productId") String productId) {
        if (productService.findProductByProductId(productId) == null) {
            return new ResponseObject("200", "Sản phẩm không tồn tại", null);
        } else {
            Products listProduct = productService.findProductByProductId(productId);

            int score = 0;
            float rateScore = 0.0f;
            if (null == listProduct) {
                return new ResponseObject("200", "Sản phẩm chưa có đánh giá", null);
            } else {
                return new ResponseObject("200", "OK", listProduct);
            }
        }
    }

    @ResponseBody
    @PutMapping("/updateProductRateByProductId/{reviewId}")
    ResponseObject updateProductRateByProductId(@PathVariable("reviewId") String reviewId) {
        Optional<ProductRate> productRate = productRateService.findById(reviewId);
        System.out.println(productRate.get().getRate());
        System.out.println(productRate.get().getId());
        System.out.println(productRate.get().getReviewStatus());
        if (!productRate.isPresent()) {
            return new ResponseObject("200", "Đánh giá không tồn tại", null);
        } else {
            if (productRate.get().getReviewStatus()) {
                productRate.get().setReviewStatus(false);

                ProductRate save = EntityDtoUtils.convertToEntity(productRate.get(), ProductRate.class);
                productRateService.saveProductRate(save);
                return new ResponseObject("200", "Ẩn đánh giá thành công", productRate);
            } else {
                productRate.get().setReviewStatus(true);
                ProductRate save = EntityDtoUtils.convertToEntity(productRate.get(), ProductRate.class);
                productRateService.saveProductRate(save);
                return new ResponseObject("200", "Hiển thị đánh giá thành công", productRate);
            }
        }
    }

    @GetMapping("/an-danh-gia/{reviewId}")
    public String updateProductRateByRateID(@PathVariable("reviewId") String reviewId, Model model) {
        Optional<ProductRate> productRate = productRateService.findById(reviewId);
        System.out.println(productRate.get().getRate());
        System.out.println(productRate.get().getId());
        System.out.println(productRate.get().getReviewStatus());
        if (!productRate.isPresent()) {
            return "views/admin/page/views/rate-list";
        } else {
            productRate.get().setReviewStatus(false);

            ProductRate save = EntityDtoUtils.convertToEntity(productRate.get(), ProductRate.class);
            productRateService.saveProductRate(save);

            session.setAttribute("toastSuccess", "Ẩn đánh giá thành công !");
            model.addAttribute("listRate", rateService.findAll());
            model.addAttribute("listProduct", productService.findAll());
            return "redirect:/quan-tri/danh-gia";
        }
    }

    @GetMapping("/hien-thi-danh-gia/{reviewId}")
    public String updateProductRateByRateIDShow(@PathVariable("reviewId") String reviewId, Model model) {
        Optional<ProductRate> productRate = productRateService.findById(reviewId);
        System.out.println(productRate.get().getRate());
        System.out.println(productRate.get().getId());
        System.out.println(productRate.get().getReviewStatus());
        if (!productRate.isPresent()) {
            return "views/admin/page/views/rate-list";
        } else {
            productRate.get().setReviewStatus(true);

            ProductRate save = EntityDtoUtils.convertToEntity(productRate.get(), ProductRate.class);
            productRateService.saveProductRate(save);

            session.setAttribute("toastSuccess", "Hiển thị đánh giá thành công !");
            model.addAttribute("listRate", rateService.findAll());
            model.addAttribute("listProduct", productService.findAll());
            return "redirect:/quan-tri/danh-gia";
        }
    }
}
