package com.main.controller.admin.restcontroller;

import com.main.dto.APIUsersDto;
import com.main.entity.NotificationOrder;
import com.main.entity.Users;
import com.main.service.NotificationService;
import com.main.service.UserService;
import com.main.utils.EntityDtoUtils;
import com.main.utils.SessionAttr;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("api/quan-tri")
public class NotificationAPIAD {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private HttpSession session;

    @GetMapping("/notification/findAll")
    private List<NotificationOrder> findAll() {
        return notificationService.findAll();
    }

    @GetMapping("/notification/deleteNoted/{id}")
    private void deleteIsSeen(@PathVariable int id) {
        NotificationOrder notOrder = notificationService.findById(id);
        notificationService.delete(notOrder);
    }

    @PutMapping("/notification/updateIsSeen/{id}/{isSeen}")
    private void updateIsSeen(@PathVariable int id, @PathVariable boolean isSeen) {
        NotificationOrder notOrder = notificationService.findById(id);
        notOrder.setIsSeen(isSeen);
        notificationService.save(notOrder);
    }

    // lấy ra thông tin người dùng đang đăng nhập
    @GetMapping("/notification/userIsLogin")
    private APIUsersDto getSession() {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_ADMIN);
        return EntityDtoUtils.convertToDto(users, APIUsersDto.class);
    }

    @PutMapping("/notification/changePasswordAdmin/{password}/{newPassword}")
    private Map<String, String> changePassword(@PathVariable String password, @PathVariable String newPassword) {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_ADMIN);
        Map<String, String> response = new HashMap<>();

        String currentPassword = users.getPassword();

        if (encoder.matches(password, currentPassword)) {
            users.setPassword(encoder.encode(newPassword));
            userService.update(users);
            session.removeAttribute(SessionAttr.CURRENT_ADMIN);
            response.put("message", "success:Đổi mật khẩu thành công !");
        } else {
            response.put("message", "warning:Mật khẩu cũ không khớp !");
        }

        return response;
    }
}
