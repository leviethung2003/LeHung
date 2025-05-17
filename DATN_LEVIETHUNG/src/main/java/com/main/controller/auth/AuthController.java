package com.main.controller.auth;

import com.main.entity.Users;
import com.main.service.EmailService;
import com.main.service.UserService;
import com.main.utils.ParamService;
import com.main.utils.RandomUtils;
import com.main.utils.SessionAttr;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Principal;

@Controller
public class AuthController {

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    UserService userService;

    @Autowired
    ParamService paramService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    EmailService emailService;

    @Autowired
    HttpSession session;

    //xác thực email
    @GetMapping("xac-thuc-email")
    public String verifyEmail(@RequestParam("token") String token) {
        Users users = userService.findByToken(token);

        if (users != null) {
            users.setAcctive(Boolean.TRUE);
            userService.update(users);
        }
        return "redirect:/#!xac-thuc-tai-khoan";
    }

    @GetMapping("/login-google-success")
    public String loginWithGoogle(Principal principal, OAuth2AuthenticationToken oauth) {
        if (principal != null && oauth != null) {
            OAuth2User oauth2User = oauth.getPrincipal();

            Users users = userService.findByEmail(oauth2User.getAttribute("email"));
            if (users != null) {
                if (users.isAcctive()) {
                    users.setPicture(oauth2User.getAttribute("picture"));

                    session.setAttribute(SessionAttr.CURRENT_USER, users);
                    session.setAttribute("toastSuccess", "Đăng nhập thành công !");
                } else {
                    session.setAttribute("centerWarning", "Tài khoản '" + users.getEmail() + "' hiện tại đang bị tạm khoá vui lòng liên hệ hotline để biết thêm chi tiết !");
                }
            } else {
                Users user = new Users();
                user.setEmail(oauth2User.getAttribute("email"));
                user.setFullname(oauth2User.getAttribute("name"));
                user.setPassword(RandomUtils.RandomToken(10));
                user.setPicture(oauth2User.getAttribute("picture"));
                user.setAcctive(Boolean.TRUE);

                userService.register(user);

                session.setAttribute(SessionAttr.CURRENT_USER, user);
                session.setAttribute("toastSuccess", "Đăng nhập thành công !");
            }
            return "redirect:#!/trang-chu";
        }

        session.setAttribute("toastFailed", "Sai thông tin đăng nhập !");
        return "redirect:#!/dang-nhap";
    }

    // xoá session
    @GetMapping("redirect-logout")
    public String logoutTemp() {
        session.removeAttribute(SessionAttr.CURRENT_USER);
        return "redirect:#!/trang-chu";
    }
}
