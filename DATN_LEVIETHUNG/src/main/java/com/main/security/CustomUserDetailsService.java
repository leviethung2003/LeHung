package com.main.security;

import com.main.entity.Roles;
import com.main.entity.Users;
import com.main.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = userRepository.findUserByEmail(email);

        if (user != null) {
            if (!user.isAcctive()) {
                throw new UsernameNotFoundException("Tài khoản của bạn đang bị tạm khoá !");
            }
            return new User(user.getEmail(), user.getPassword(), mapRolesToAuthorities(user.getRoles()));
        } else {
            throw new UsernameNotFoundException("Email hoặc mật khẩu không đúng !");
        }
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Roles> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getNameRole())).collect(Collectors.toList());
    }
}
