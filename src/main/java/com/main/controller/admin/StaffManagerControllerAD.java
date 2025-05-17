package com.main.controller.admin;

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
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("quan-tri/nhan-vien")
public class StaffManagerControllerAD {

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    HttpSession session;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping
    public String showStaff() {
        return "views/admin/page/views/staff-list";
    }

    @GetMapping("them-nhan-vien")
    public String addStaff(Model model) {
        model.addAttribute("usersDto", new UsersDto());
        return "views/admin/page/crud/staff/staff-add";
    }

    @PostMapping("them-nhan-vien")
    public String submitStaff(@Valid UsersDto usersDto) {
        Roles role = roleService.findByNameRole("ROLE_STAFF");

        usersDto.setAcctive(true);
        usersDto.setRoles(List.of(role));
        Users users = EntityDtoUtils.convertToEntity(usersDto, Users.class);
        userService.save(users);
        session.setAttribute("toastSuccess", "Thêm thành công!");
        return "views/admin/page/crud/staff/staff-add";
    }

    @GetMapping("sua-nhan-vien/id={userId}")
    public String editStaff(@PathVariable int userId, Model model) {
        Users users = userService.findById(userId);

        model.addAttribute("password", users.getPassword());
        model.addAttribute("usersDto", EntityDtoUtils.convertToDto(users, Users.class));
        model.addAttribute("users", users);
        return "views/admin/page/crud/staff/staff-edit";
    }

    @PostMapping("sua-nhan-vien")
    public String account_edit(@ModelAttribute("usersDto") UsersDto usersDto) {
        userService.update(EntityDtoUtils.convertToEntity(usersDto, Users.class));

        session.setAttribute("toastSuccess", "Cập nhật thành công !");
        return "redirect:/quan-tri/nhan-vien";
    }

    @GetMapping("xoa-nhan-vien/{id}")
    public String account_delete(@PathVariable("id") int id) {
        Users users = userService.findById(id);
        users.setAcctive(Boolean.FALSE);
        userService.update(users);
        session.setAttribute("toastSuccess", "Xoá thành công !");
        return "redirect:/quan-tri/nhan-vien";
    }

    @GetMapping("api/findAllRoleStaff")
    private ResponseEntity<List<Users>> getListUserRoleStaff() {
        List<Users> users = userService.findStaffByActiveIsTrue();

        for (Users user : users) {
            String encodedPhone = EncodeUtils.encodePhoneNumber(user.getPhoneNumber());
            user.setPhoneNumber(encodedPhone);
        }

        return ResponseEntity.ok(users);
    }

    @PutMapping("api/updateRole/{userId}")
    private ResponseEntity<?> updateRoles(@PathVariable int userId, @RequestBody List<String> roles) {
        Users user = userService.findById(userId);

        List<Roles> rolesList = roles.stream()
                .map(roleService::findByNameRole)
                .collect(Collectors.toList());

        user.setRoles(rolesList);

        Users updatedUser = userService.update(user);
        return ResponseEntity.ok(updatedUser);
    }
}
