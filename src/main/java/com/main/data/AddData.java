package com.main.data;

import com.github.javafaker.Faker;
import com.main.dto.ResponseObject;
import com.main.entity.OrderItems;
import com.main.entity.Orders;
import com.main.entity.Products;
import com.main.entity.Users;
import com.main.service.OrderItemService;
import com.main.service.OrderService;
import com.main.service.ProductService;
import com.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Controller
@RequestMapping("add-data")
public class AddData {

    @Autowired
    OrderService orderService;

    @Autowired
    OrderItemService orderItemService;

    @Autowired
    ProductService productService;
    @Autowired
    UserService userService;

    @GetMapping("product")
    @ResponseBody
    public ResponseObject generateProducts() {
        int numberOfProducts = 300;

        List<Products> productsList = new ArrayList<>();
        Faker faker = new Faker();


        for (int i = 0; i < numberOfProducts; i++) {
            Products product = new Products();

            product.setId("SP000" + i);
            product.setProductTypeId(faker.number().numberBetween(1, 40));
            product.setProductBrandId("BR000" + faker.number().numberBetween(1, 10));
            product.setProductName(faker.commerce().productName());
            product.setPrice(BigDecimal.valueOf(faker.number().numberBetween(1000000, 1000000000)));
            product.setQuantity(faker.number().numberBetween(10, 10000));
            product.setDescriptions(faker.lorem().sentence());
            product.setTemplateDescription(faker.lorem().paragraph());
            product.setPowers(faker.number().numberBetween(1, 100) + faker.options().option("W", "KW"));
            product.setWarranty(faker.number().numberBetween(1, 15) + faker.options().option(" Tháng", " Năm"));
            product.setIsStatusDelete(faker.options().option("Đang kinh doanh", "Ngừng kinh doanh"));

            Timestamp randomTimestamp = new Timestamp(faker.date().past(365, java.util.concurrent.TimeUnit.DAYS).getTime());

            product.setDateCreated(randomTimestamp);

            productService.save(product);
            productsList.add(product);
        }

        return new ResponseObject("200", "Đã thêm dữ liệu Product thành công", productsList);
    }

    @GetMapping("order")
    @ResponseBody
    public ResponseObject generateOrders() {
        int numberOfOrders = 1500;
        List<Orders> ordersList = new ArrayList<>();
        Faker faker = new Faker();

        LocalDate startDate = LocalDate.of(2019, 1, 1);
        long daysBetween = ChronoUnit.DAYS.between(startDate, LocalDate.now());

        List<Integer> users = userService.findAllUser().stream()
                .map(Users::getId)
                .toList();

        for (int i = 0; i < numberOfOrders; i++) {
            Orders order = new Orders();

            // Tạo ID đơn hàng
            order.setId("DH" + faker.number().digits(14));

            Integer randomUserId = getRandomIdInt(users);
            order.setUserId(randomUserId);

            order.setPaymentType(faker.bool().bool());
            order.setPaymentStatus(faker.number().numberBetween(0, 2));
            String[] statuses = {"Đã giao hàng", "Đã huỷ đơn", "Chờ xác nhận"};
            order.setOrderStatus(faker.options().option(statuses));
            order.setOrderShipCost(BigDecimal.valueOf(faker.number().randomDouble(2, 10000, 400000)));
            order.setToName(faker.name().fullName());
            order.setToPhone(faker.phoneNumber().cellPhone());
            order.setToProvince(faker.address().state());
            order.setToDistrict(faker.address().cityName());
            order.setToWard(faker.address().secondaryAddress());
            order.setToAddress(faker.address().fullAddress());
            order.setOrderNote(faker.lorem().sentence());

            // Tạo ngày ngẫu nhiên
            Date randomDate = faker.date().past((int) daysBetween, TimeUnit.DAYS);
            order.setDateCreated(new Timestamp(randomDate.getTime()));

            orderService.save(order);
            ordersList.add(order);
        }
        return new ResponseObject("200", "Đã thêm dữ liệu Order thành công", ordersList);
    }


    @GetMapping("items-order")
    @ResponseBody
    public ResponseObject generateOrderItems() {
        int numberOfItems = 1500; // Số lượng items cần tạo
        List<OrderItems> orderItemList = new ArrayList<>();
        Faker faker = new Faker();

        List<String> orderIds = orderService.findAll().stream()
                .map(Orders::getId)
                .toList();
        List<String> products = productService.findAll().stream()
                .map(Products::getId)
                .toList();

        for (int i = 0; i < numberOfItems; i++) {
            OrderItems item = new OrderItems();

            // Liên kết mỗi item với một order ngẫu nhiên từ danh sách orderIds
            String randomOrderId = getRandomId(orderIds);
            item.setOrderId(randomOrderId);

            // Mã sản phẩm ngẫu nhiên từ danh sách products
            String randomProductId = getRandomId(products);
            item.setProductId(randomProductId);

            // Số lượng sản phẩm (từ 1 đến 10)
            item.setQuantity(faker.number().numberBetween(1, 10));

            // Giá của sản phẩm (giả sử từ 10,000 đến 1,000,000)
            item.setPrice(BigDecimal.valueOf(faker.number().randomDouble(2, 10000, 1000000)));

            orderItemService.save(item);
            orderItemList.add(item);
        }

        return new ResponseObject("200", "Đã thêm dữ liệu OrderItem thành công", orderItemList);
    }

    private String getRandomId(List<String> idList) {
        Random random = new Random();
        int randomIndex = random.nextInt(idList.size());
        return idList.get(randomIndex);
    }

    private Integer getRandomIdInt(List<Integer> idList) {
        Random random = new Random();
        int randomIndex = random.nextInt(idList.size());
        return idList.get(randomIndex);
    }
}
