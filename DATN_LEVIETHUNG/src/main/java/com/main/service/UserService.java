package com.main.service;

import com.main.dto.security.LoginDto;
import com.main.entity.Users;

import java.util.List;

public interface UserService {

    List<Users> findAllUser();

    List<Users> findUserByActiveIsTrue();

    List<Users> findStaffByActiveIsTrue();

    Users findById(int userId);

    Users findByEmail(String email);

    Users findByPhoneNumber(String phoneNumber);

    Users findByToken(String token);

    Users register(Users users);

    Users save(Users users);

    Users update(Users users);

    Integer findIdByPhoneNumberAndNotCurrentUser(String phoneNumber, Integer userId);

    Users delete(int userId);

    Users updatePass(int userId, String password);

    Users findUserByRoleAndActive(String email);

    String authenticateLogin(LoginDto loginDto);
}
