package com.main.controller.restcontroller;

import com.main.dto.ChangePassDto;
import com.main.dto.PasswordsDto;
import com.main.entity.Users;
import com.main.service.EmailService;
import com.main.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:8080")
public class PasswordAPI {

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    UserService userService;

    @Autowired
    HttpSession session;

    @Autowired
    EmailService emailService;

    @PostMapping("password/{email}")
    public void submitEmail(@PathVariable String email, @Valid PasswordsDto passwordsDto) {
        String verifyCode = String.valueOf((int) (Math.floor(Math.random() * 899999) + 100000));
        Users users = userService.findByEmail(email);

        long startTime = System.currentTimeMillis();
        session.setAttribute("startTime", startTime);
        session.setAttribute("verifyCode", verifyCode);
        session.setAttribute("full_name", users.getFullname());
        passwordsDto.setFull_name(users.getFullname());
        passwordsDto.setVerifyCode(verifyCode);

        session.setAttribute("forgotEmail", passwordsDto.getEmail());
        ;
        emailService.queueEmailForgot(passwordsDto);
    }

    @PostMapping("password/xac-nhan-code")
    public ResponseEntity<Map<String, Boolean>> submitOTP(@RequestBody Map<String, String> requestBody) {
        String verifyCode = requestBody.get("verifyCode");

        String storedVerifyCode = (String) session.getAttribute("verifyCode");

        Map<String, Boolean> response = new HashMap<>();

        if (verifyCode.equals(storedVerifyCode)) {
            response.put("isValid", true);
        } else {
            response.put("isValid", false);
        }
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("check-email-user-active/{email}")
    public Map<String, Boolean> checkEmailUserActiveAPI(@PathVariable String email) {
        Map<String, Boolean> response = new HashMap<>();
        Users users = userService.findUserByRoleAndActive(email);

        if (users != null) {
            response.put("exists", true);
        } else {
            response.put("exists", false);
        }
        return response;
    }

    @GetMapping("check-code-on-time")
    public Map<String, Boolean> checkCodeOnTimeAPI() {
        Map<String, Boolean> response = new HashMap<>();

        long startTime = (long) session.getAttribute("startTime");

        long currentTime = System.currentTimeMillis();
        long elapsedTime = currentTime - startTime;

        if (elapsedTime > 2 * 60 * 1000) { // 2 phút (2 * 60 * 1000 ms)
            response.put("exists", false);
        } else {
            response.put("exists", true);
        }
        return response;
    }

    @PutMapping("password/new-password")
    public ResponseEntity<Users> changePasswordAPI(@RequestBody ChangePassDto changePassDto) {

        String email = (String) session.getAttribute("forgotEmail");

        Users users = userService.findByEmail(email);

        String passwordEncore = encoder.encode(changePassDto.getNewPass());

        Users updatePassUser = userService.updatePass(users.getId(), passwordEncore);

        if (updatePassUser != null) {
            session.setAttribute("toastSuccess", "Cập nhật mật khẩu thành công !");
            session.removeAttribute(email);
            return ResponseEntity.ok().body(updatePassUser);
        } else {
            session.setAttribute("toastError", "Cập nhật mật khẩu không thành công.");
            session.removeAttribute(email);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
