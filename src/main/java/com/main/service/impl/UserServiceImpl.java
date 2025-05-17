package com.main.service.impl;

import com.main.dto.security.LoginDto;
import com.main.entity.Roles;
import com.main.entity.Users;
import com.main.repository.RoleRepository;
import com.main.repository.UserRepository;
import com.main.security.jwt.JwtUtilities;
import com.main.service.UserService;
import com.main.utils.RandomUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtilities jwtUtilities;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Users> findAllUser() {
        return userRepository.findAll();
    }

    @Override
    public List<Users> findUserByActiveIsTrue() {
        return userRepository.findUserByActiveIsTrue();
    }

    @Override
    public List<Users> findStaffByActiveIsTrue() {
        return userRepository.findStaffByActiveIsTrue();
    }

    @Override
    public Users findById(int userId) {
        return userRepository.getReferenceById(userId);
    }

    @Override
    public Users findByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public Users findByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    @Override
    public Users findByToken(String token) {
        return userRepository.findByToken(token);
    }

    @Override
    public Users register(Users users) {
        users.setPassword(passwordEncoder.encode(users.getPassword()));
        users.setToken(RandomUtils.RandomToken(20));
        users.setDateCreated(new Timestamp(System.currentTimeMillis()));

        Roles role = roleRepository.findByNameRole("ROLE_USER");
        if (role == null) {
            role = checkRoleExist();
        }
        users.setRoles(List.of(role));
        return userRepository.save(users);
    }

    @Override
    public Users save(Users users) {
        users.setPassword(passwordEncoder.encode(users.getPassword()));
        users.setToken(RandomUtils.RandomToken(20));
        users.setDateCreated(new Timestamp(System.currentTimeMillis()));

        return userRepository.save(users);
    }

    @Override
    public Users update(Users users) {
        return userRepository.save(users);
    }

    @Override
    public Integer findIdByPhoneNumberAndNotCurrentUser(String phoneNumber, Integer userId) {
        return userRepository.findIdByPhoneNumberAndNotCurrentUser(phoneNumber, userId);
    }

    @Override
    public Users delete(int userId) {
        Users users = findById(userId);
        if (users != null) {
            users.setAcctive(Boolean.FALSE);
        }
        return users;
    }

    @Override
    public Users updatePass(int userId, String password) {
        Users users = userRepository.findById(userId);
        if (users == null) {
            return null;
        }
        users.setPassword(password);
        return userRepository.save(users);
    }

    @Override
    public Users findUserByRoleAndActive(String email) {
        return userRepository.findUserByRoleAndActive(email);
    }

    @Override
    public String authenticateLogin(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Users user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<String> rolesNames = new ArrayList<>();
        user.getRoles().forEach(r -> rolesNames.add(r.getNameRole()));
        return jwtUtilities.generateToken(user.getEmail(), rolesNames);
    }

    private Roles checkRoleExist() {
        Roles role = new Roles();
        role.setNameRole("ROLE_USER");
        return roleRepository.save(role);
    }
}
