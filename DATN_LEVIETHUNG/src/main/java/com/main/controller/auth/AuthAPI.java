package com.main.controller.auth;

import com.main.dto.RegisterDto;
import com.main.dto.security.LoginDto;
import com.main.entity.Users;
import com.main.security.jwt.JwtUtilities;
import com.main.service.EmailService;
import com.main.service.UserService;
import com.main.utils.EntityDtoUtils;
import com.main.utils.SessionAttr;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("api")
public class AuthAPI {

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    UserService userService;

    @Autowired
    EmailService emailService;

    @Autowired
    JwtUtilities jwtUtilities;

    @Autowired
    HttpSession session;

    // register
    @PostMapping("user/register")
    public Users addUser(@RequestBody RegisterDto registerDto) {
        emailService.queueEmailRegister(registerDto);

        Users user = EntityDtoUtils.convertToEntity(registerDto, Users.class);
        user.setAcctive(Boolean.FALSE);
        return userService.register(user);
    }

    // login
    @PostMapping("user/login/authenticate")
    public ResponseEntity<?> loginSecurity(@RequestBody LoginDto loginDto) {
        Map<String, String> response = new HashMap<>();

        try {
            String token = userService.authenticateLogin(loginDto);
            response.put("token", token);
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            response.put("token", "false");
            return ResponseEntity.ok(response);
        }
    }

    // get request client
    @GetMapping("user/request-client")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        Map<String, Object> response = new HashMap<>();

        Claims claims = jwtUtilities.extractAllClaims(token);

        String username = claims.getSubject();
        List<String> roles = (List<String>) claims.get("roles");

        response.put("username", username);
        response.put("roles", roles);

        return ResponseEntity.ok(response);
    }

    @GetMapping("user/redirectUrl/{email}")
    public ResponseEntity<Map<String, String>> loginSuccess(@PathVariable String email) {
        Map<String, String> response = new HashMap<>();

        if (email != null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            Users user = userService.findByEmail(userDetails.getUsername());

            if (userDetails.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_USER"))) {
                if (user != null) {
                    session.setAttribute(SessionAttr.CURRENT_USER, user);
                    session.setAttribute("toastSuccess", "Đăng nhập thành công !");
                    response.put("message", "Đăng nhập thành công !");
                    return ResponseEntity.ok(response);
                }
            }
        }

        session.setAttribute("toastSuccess", "Sai thông tin đăng nhập !");
        response.put("message", "Sai thông tin đăng nhập !");
        return ResponseEntity.ok(response);
    }
}
