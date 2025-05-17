package com.main.controller.restcontroller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.dto.AddressDto;
import com.main.dto.ChangePassDto;
import com.main.dto.ProfileDto;
import com.main.dto.UsersDto;
import com.main.entity.Address;
import com.main.entity.Users;
import com.main.service.AddressService;
import com.main.service.EmailService;
import com.main.service.OrderService;
import com.main.service.UserService;
import com.main.utils.EntityDtoUtils;
import com.main.utils.SessionAttr;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:8080")
public class ProfileAPI {

    @Autowired
    UserService userService;

    @Autowired
    OrderService orderService;

    @Autowired
    AddressService addressService;

    @Autowired
    EmailService emailService;

    @Autowired
    HttpSession session;

    @Autowired
    PasswordEncoder encoder;

    //Fill form thông tin cá nhân
    @GetMapping("profile/profile-session-user")
    public ResponseEntity<String> sessionUser() {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);
        if (users != null) {
            Integer userId = users.getId();
            BigDecimal sumResult = orderService.sumOrderPrice(userId); // Sử dụng truy vấn của bạn
            BigDecimal countResult = orderService.countOrdersByAccountId(userId);
            if (sumResult == null) {
                sumResult = BigDecimal.valueOf(0);
            }
            if (countResult == null) {
                countResult = BigDecimal.valueOf(0);
            }
            users.setProvinceName(users.getProvinceName() != null ? users.getProvinceName() : ". . .");
            users.setDistrictName(users.getDistrictName() != null ? users.getDistrictName() : ". . .");
            users.setWardName(users.getWardName() != null ? users.getWardName() : ". . .");

            UsersDto usersDto = new UsersDto();
            usersDto.setId(users.getId());
            usersDto.setEmail(users.getEmail());
            usersDto.setFullname(users.getFullname());
            usersDto.setGender(users.getGender());
            usersDto.setPhoneNumber(users.getPhoneNumber());
            usersDto.setBirth(users.getBirth());
            usersDto.setDateCreated(users.getDateCreated());
            usersDto.setProvinceName(users.getProvinceName());
            usersDto.setDistrictName(users.getDistrictName());
            usersDto.setWardName(users.getWardName());
            usersDto.setAddress(users.getAddress());
            usersDto.setPicture(users.getPicture());
            usersDto.setTotalOrderPrice(sumResult);
            usersDto.setOrderCount(countResult);

            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String json = objectMapper.writeValueAsString(usersDto);
                return ResponseEntity.ok(json);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error converting to JSON");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found in session");
        }
    }

    @GetMapping("profile/{userId}")
    public ResponseEntity<Users> getAccountById(@PathVariable int userId) {
        Users users = userService.findById(userId);
        return ResponseEntity.ok().body(users);
    }

    //Cập nhật thông tin cá nhân
    @PutMapping("profile/{userId}")
    public ResponseEntity<Users> updateUser(@PathVariable int userId, @RequestBody ProfileDto profileDto) {
        Users users = userService.findById(userId);

        users.setFullname(profileDto.getFullname());
        users.setGender(profileDto.getGender());
        users.setBirth(profileDto.getBirth());
        users.setAddress(profileDto.getAddress());
        users.setPhoneNumber(profileDto.getPhoneNumber());
        users.setProvinceName(profileDto.getProvinceName());
        users.setDistrictName(profileDto.getDistrictName());
        users.setWardName(profileDto.getWardName());

        Users updateUser = userService.update(users);

        // thêm địa chỉ của user vào bảng địa chỉ
        AddressDto addressDto = getAddressDto(users);
        createAddress(addressDto, users.getId());

        if (updateUser != null) {
            session.setAttribute(SessionAttr.CURRENT_USER, updateUser);
            session.setAttribute("centerSuccess", "Thông tin cá nhân của bạn đã được cập nhật thành công.");
            return ResponseEntity.ok().body(updateUser);
        } else {
            session.setAttribute("toastError", "Cập nhật thông tin không thành công.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Cập nhật mật khẩu (form đổi mật khẩu)
    @PutMapping("profile/change-password")
    public ResponseEntity<Users> changePasswordAPI(@RequestBody ChangePassDto changePassDto) {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);

        String passwordEncore = encoder.encode(changePassDto.getNewPass());
        Users updatePassUser = userService.updatePass(users.getId(), passwordEncore);

        if (updatePassUser != null) {
            session.setAttribute(SessionAttr.CURRENT_USER, updatePassUser);
            session.setAttribute("toastSuccess", "Cập nhật mật khẩu thành công !");
            return ResponseEntity.ok().body(updatePassUser);
        } else {
            session.setAttribute("toastError", "Cập nhật mật khẩu không thành công.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Bắt lỗi mật khẩu hiện tại không khớp (form đổi mật khẩu)
    @GetMapping("check-current-password/{currentPass}")
    public Map<String, Boolean> checkCurrentPassAPI(@PathVariable String currentPass) {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);
        Map<String, Boolean> response = new HashMap<>();

        if (users != null) {
            boolean isCurrentPassCorrect = encoder.matches(currentPass, users.getPassword());
            if (isCurrentPassCorrect) {
                response.put("exists", true);
            } else {
                response.put("exists", false);
            }
        }
        return response;
    }

    @GetMapping("check-phone-user/{phoneNumber}")
    public Map<String, Boolean> checkPhoneProfileAPI(@PathVariable String phoneNumber) {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);
        Map<String, Boolean> response = new HashMap<>();

        if (users != null) {
            Integer userId = userService.findIdByPhoneNumberAndNotCurrentUser(phoneNumber, users.getId());
            if (userId != null) {
                response.put("exists", true);
            } else {
                response.put("exists", false);
            }
        }
        return response;
    }

    // thêm vào bảng địa chỉ
    private AddressDto getAddressDto(Users users) {
        AddressDto addressDto = new AddressDto();
        addressDto.setToName(users.getFullname());
        addressDto.setToPhone(users.getPhoneNumber());
        addressDto.setToProvince(users.getProvinceName());
        addressDto.setToDistrict(users.getDistrictName());
        addressDto.setToWard(users.getWardName());
        addressDto.setToAddress(users.getAddress());
        addressDto.setIsActive(Boolean.TRUE);
        addressDto.setUserId(users.getId());
        return addressDto;
    }

    private void createAddress(AddressDto addressDto, int userId) {
        List<Address> address = addressService.findAllByUserId(userId);

        if (address.isEmpty()) {
            Address newAddress = EntityDtoUtils.convertToDto(addressDto, Address.class);
            addressService.save(newAddress);
        }
    }
}
