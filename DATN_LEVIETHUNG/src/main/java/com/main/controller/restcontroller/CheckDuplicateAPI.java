package com.main.controller.restcontroller;

import com.main.controller.admin.UserControllerAD;
import com.main.entity.Users;
import com.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("api")
public class CheckDuplicateAPI {

    @Autowired
    UserService userService;

    @GetMapping("check-duplicate-email/{email}")
    public Map<String, Boolean> checkDuplicateEmail(@PathVariable String email) {
        Map<String, Boolean> response = new HashMap<>();
        boolean exists = userService.findByEmail(email) != null;
        response.put("exists", exists);
        return response;
    }

    @GetMapping("check-duplicate-phone/{phoneNumber}")
    public Map<String, Boolean> checkDuplicatePhone(@PathVariable String phoneNumber) {
        Map<String, Boolean> response = new HashMap<>();
        boolean exists = userService.findByPhoneNumber(phoneNumber) != null;
        response.put("exists", exists);
        return response;
    }

    @GetMapping("success-message")
    public Map<String, Boolean> getSuccessMessage() {
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", UserControllerAD.successMessage);
        UserControllerAD.successMessage = false;
        return response;
    }
}
