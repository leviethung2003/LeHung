package com.main.controller.restcontroller;

import com.main.dto.ResponseObject;
import com.main.entity.*;
import com.main.repository.ProductRateRepository;
import com.main.service.*;
import com.main.utils.EntityDtoUtils;
import com.main.utils.SessionAttr;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("api/rate-product")
public class ProductRateAPI {

    @Autowired
    ProductRateRepository productRateRepository;

    @Autowired
    ProductRateService productRateService;

    @Autowired
    ProductRateImageService productRateImageService;

    @Autowired
    OrderService orderService;

    @Autowired
    UserService userService;

    @Autowired
    BannerWordService bannerWordService;

    @Autowired
    ProductService productService;

    @Autowired
    HttpSession session;

    @Autowired
    OrderItemService orderItemService;

    @GetMapping("findProductRate/{productId}")
    ResponseObject showRate(@PathVariable("productId") String productId){
        List<ProductRate> productRate =  productRateService.findAllRateByProductId(productId);

        return new ResponseObject("200", "Lấy dữ liệu thành công!", productRate);
    }

    @GetMapping("findOrderByUserId/{userId}")
    ResponseObject showOther(@PathVariable("userId") Integer userId) {
        List<Orders> orders = orderService.findByUserId(userId);

        if(userService.findById(userId) == null){
            return new ResponseObject("404", "Tài khoản không tồn tại vui lòng đăng nhập lại!",null);
        }else if(orders.isEmpty()){
            return new ResponseObject("200", "Lấy dữ liệu thành công!", null);
        }else{
            List<Orders> orderDelivered = new ArrayList<>();

            for (Orders orders1 : orders) {
                if(orders1.getOrderStatus().equals("Đã giao hàng")){
                    orderDelivered.add(orders1);
                }
            }
            return new ResponseObject("200", "Dữ liệu có tồn tại!", orderDelivered);
        }
    }

    @GetMapping("listBannerWord")
    String[] bannerWordList() {
        List<BannerWords> bannerWords = bannerWordService.findAll();

        String[] wordsArray = bannerWords.stream()
                .map(BannerWords::getWord)
                .toArray(String[]::new);

        return wordsArray;
    }

    @GetMapping("listOrderByOrderId")
    ResponseObject listOrderByOrderId() {
        return new ResponseObject("200", "OKE", orderService.findAll());
    }

    @PostMapping("/save")
    ResponseObject save(@RequestParam("stars") int stars,
                        @RequestParam("comment") String comment,
                        @RequestParam(value = "images", required = false) MultipartFile[] images,
                        @RequestParam("productId") String productId,
                        @RequestParam("orderId") String orderId) {

        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);
        List<OrderItems> orderItems = orderItemService.findByOrderIdAndProductId(orderId, productId);

        ProductRate productRate = new ProductRate();
        String id = productRateIdValue();
        productRate.setId(id);
        productRate.setProductId(productId);
        productRate.setContent(comment);
        productRate.setUserId(users.getId());
        productRate.setDateCreated(new Timestamp(System.currentTimeMillis()));
        productRate.setRate(stars);
        productRate.setOrderId(orderId);
        productRate.setReviewStatus(true);

        productRateService.saveProductRate(productRate);

        orderItems.get(0).setStatusRate(true);
        orderItemService.save(orderItems.get(0));

        if(images == null || images.length == 0 || images[0].isEmpty()){
            return new ResponseObject("200", "Bạn đã đánh giá thành công!", null);
        }else{
            for (int i = 0; i < images.length; i++) {
                MultipartFile image = images[i];
                ProductRateImage productRateImage = new ProductRateImage();

                if (image != null && !image.isEmpty()) {
                    Path path = Paths.get("src/main/resources/static/upload/");

                    if (!path.toFile().exists()) {
                        path.toFile().mkdirs();
                    }

                    try {
                        InputStream inputStream = image.getInputStream();
                        Files.copy(inputStream, path.resolve(image.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);

                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    String fileName = image.getOriginalFilename();

                    productRateImage.setId(productRate.getId() + "_" + "RIMG00" + "_" + i);
                    productRateImage.setProductRateId(productRate.getId());
                    productRateImage.setImagePath(fileName);

                    System.out.println(fileName);

                    productRateImageService.saveImageRateProduct(productRateImage);
                }
            }
            return new ResponseObject("200", "Bạn đã đánh giá thành công!", null);
        }
    }

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

    public String productRateIdValue() {
        List<ProductRate> productRateList;

        productRateList = productRateService.findAll();
        String productRateId;
        if (productRateList.isEmpty()) {
            productRateId = "R00001";
        } else {
            String input = productRateList.get(productRateList.size() - 1).getId();
            String prefix = input.substring(0, 2);
            int number = Integer.parseInt(input.substring(2));
            String newNumber = String.format("%04d", number + 1);

            productRateId = prefix + newNumber;
        }

        if (productRateService.existsById(productRateId)) {
            String prefix = productRateId.substring(0, 2);
            int number = Integer.parseInt(productRateId.substring(2));
            String newNumber = String.format("%04d", number + 1);
            productRateId = prefix + newNumber;
            return productRateId;
        } else {
            return productRateId;
        }
    }
}
