package com.main.controller.admin;

import com.main.dto.APIUsersDto;
import com.main.dto.UsersDto;
import com.main.entity.Roles;
import com.main.entity.Users;
import com.main.service.RoleService;
import com.main.service.UserService;
import com.main.utils.EncodeUtils;
import com.main.utils.EntityDtoUtils;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.Role;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("quan-tri/tai-khoan")
public class UserControllerAD {

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    HttpSession session;

    @Autowired
    PasswordEncoder encoder;

    public static boolean successMessage = false;

    @GetMapping
    public String dataAccount(Model model) {
        List<Users> users = userService.findUserByActiveIsTrue();

        for (Users user : users) {
            String encodedPhone = EncodeUtils.encodePhoneNumber(user.getPhoneNumber());
            user.setPhoneNumber(encodedPhone);
        }
        model.addAttribute("dataAccount", users);
        return "views/admin/page/views/accounts-list";
    }

    @GetMapping("them-tai-khoan")
    public String getAccount_add(Model model) {
        model.addAttribute("usersDto", new UsersDto());
        return "views/admin/page/crud/account/account-add";
    }

    @PostMapping("them-tai-khoan")
    public String postAccount_add(@Valid UsersDto usersDto) {
        Roles role = roleService.findByNameRole("ROLE_USER");

        usersDto.setAcctive(true);
        usersDto.setRoles(List.of(role));
        Users users = EntityDtoUtils.convertToEntity(usersDto, Users.class);
        userService.save(users);
        session.setAttribute("toastSuccess", "Thêm thành công!");
        successMessage = true;
        return "views/admin/page/crud/account/account-add";
    }

    @GetMapping("sua-tai-khoan/id={userId}")
    public String account_edit(@PathVariable int userId, Model model) {
        Users users = userService.findById(userId);

        model.addAttribute("password", users.getPassword());
        model.addAttribute("usersDto", EntityDtoUtils.convertToDto(users, Users.class));
        model.addAttribute("users", users);
        return "views/admin/page/crud/account/account-edit";
    }

    @PostMapping("sua-tai-khoan")
    public String account_edit(@ModelAttribute("usersDto") UsersDto usersDto) {
        userService.update(EntityDtoUtils.convertToEntity(usersDto, Users.class));

        session.setAttribute("toastSuccess", "Cập nhật thành công !");
        return "redirect:/quan-tri/tai-khoan";
    }

    @GetMapping("xoa-tai-khoan/{id}")
    public String account_delete(@PathVariable("id") int id) {
        Users users = userService.findById(id);
        users.setAcctive(Boolean.FALSE);
        userService.update(users);
        session.setAttribute("toastSuccess", "Xoá thành công !");
        return "redirect:/quan-tri/tai-khoan";
    }

    @ModelAttribute("rolesDto")
    public List<Roles> roles() {
        return roleService.findAllRoles();
    }

    // api đổi mật khẩu người dùng
    @GetMapping("api/findById/{id}")
    private ResponseEntity<APIUsersDto> getUsersById(@PathVariable int id) {
        Users users = userService.findById(id);
        APIUsersDto usersDto = EntityDtoUtils.convertToDto(users, APIUsersDto.class);
        return ResponseEntity.ok(usersDto);
    }

    @PutMapping("api/changePassword/{id}/{password}")
    private ResponseEntity<Map<String, String>> changePassword(@PathVariable int id, @PathVariable String password) {
        Users users = userService.findById(id);
        Map<String, String> response = new HashMap<>();

        if (users != null) {
            users.setPassword(encoder.encode(password));
            userService.update(users);
            response.put("message", "success:Đổi mật khẩu thành công !");
        } else {
            response.put("message", "success:Đổi mật khẩu thất bại !");
        }

        return ResponseEntity.ok(response);
    }
}