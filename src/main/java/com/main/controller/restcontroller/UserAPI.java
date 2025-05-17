package com.main.controller.restcontroller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.dto.ProfileDto;
import com.main.dto.RegisterDto;
import com.main.dto.UsersDto;
import com.main.entity.Users;
import com.main.service.EmailService;
import com.main.service.OrderService;
import com.main.service.UserService;
import com.main.utils.EntityDtoUtils;
import com.main.utils.SessionAttr;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:8080")
public class UserAPI {

    @Autowired
    UserService userService;

    @Autowired
    OrderService orderService;

    @Autowired
    EmailService emailService;

    @Autowired
    HttpSession session;

    @GetMapping("user")
    public List<Users> displayMessage() {
        return userService.findAllUser();
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<Users> getAccountById(@PathVariable int userId) {
        Users users = userService.findById(userId);
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("user/authentication")
    public boolean authentication() {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);
        return users != null;
    }

    @GetMapping("user/session-user")
    public ResponseEntity<String> sessionUser() {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);
        if (users != null) {
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
            usersDto.setToken(users.getToken());

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

    @PostMapping("user")
    public Users addUser(@RequestBody Users users) {
        users.setAcctive(Boolean.FALSE);
        return userService.save(users);
    }

    @GetMapping("user/find-by-email/{email}")
    public ResponseEntity<Map<String, Object>> getUser(@PathVariable String email) {
        Map<String, Object> response = new HashMap<>();
        Users users = userService.findByEmail(email);
        response.put("users", users);
        return ResponseEntity.ok(response);
    }

    @GetMapping("check-phone-profile/{phoneNumber}")
    public Map<String, Boolean> checkDuplicatePhone(@PathVariable String phoneNumber) {
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

    @PutMapping("user/{userId}")
    public ResponseEntity<Users> updateAccount(@PathVariable int userId, @RequestBody ProfileDto profileDto) {
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
        if (updateUser != null) {
            session.setAttribute(SessionAttr.CURRENT_USER, users);
            session.setAttribute("toastSuccess", "Cập nhật thông tin thành công !");
            return ResponseEntity.ok().body(updateUser);
        } else {
            session.setAttribute("toastError", "Cập nhật thông tin không thành công.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("user/{userId}")
    public String deleteAccount(@PathVariable int userId) {
        userService.delete(userId);
        return "A record successfully deleted !";
    }
}
