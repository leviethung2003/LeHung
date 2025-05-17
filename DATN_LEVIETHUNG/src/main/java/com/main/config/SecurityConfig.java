package com.main.config;

import com.main.security.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.endpoint.DefaultAuthorizationCodeTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthorizationRequestRepository<OAuth2AuthorizationRequest> getRepository() {
        return new HttpSessionOAuth2AuthorizationRequestRepository();
    }

    @Bean
    public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> getToken() {
        return new DefaultAuthorizationCodeTokenResponseClient();
    }


    //lọc quyền truy cập dựa vào role
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeHttpRequests(
                        authorize -> authorize
                                .requestMatchers("/user/**", "/admin/**").permitAll()
                                .requestMatchers(
                                        "/quan-tri/dashboard"
                                ).hasAnyAuthority("ROLE_ADMIN", "ROLE_STAFF")
                                .requestMatchers(
                                        "/quan-tri/tai-khoan/**",
                                        "/quan-tri/nhan-vien/**"
                                ).hasAnyAuthority("ROLE_ADMIN") // role super admin
                                .requestMatchers(
                                        "/quan-tri/danh-gia/**",
                                        "/quan-tri/quan-ly-tu-cam/**",
                                        "/quan-tri/doanh-thu-thang",
                                        "/quan-tri/doanh-thu-nam",
                                        "/quan-tri/doanh-thu-nam/load-bieu-do"
                                ).hasAnyAuthority("ROLE_ADMIN")
                                .requestMatchers(
                                        "/quan-tri/san-pham/**",
                                        "/quan-tri/danh-muc/**",
                                        "/quan-tri/the-loai/**",
                                        "/quan-tri/danh-sach-thuong-hieu/**",
                                        "/quan-tri/giam-gia/**",
                                        "/quan-tri/giam-gia-san-pham/**",
                                        "/quan-tri/xac-nhan-don-hang/**"
                                ).hasAnyAuthority("ROLE_STAFF")
                                .requestMatchers("/**").permitAll()
                )
                .formLogin(
                        form -> form
                                .loginPage("/admin")
                                .loginProcessingUrl("/admin/login")
                                .defaultSuccessUrl("/quan-tri/dashboard")
                                .failureUrl("/admin?error=true")
                                .permitAll()
                ).logout(
                        logout -> logout
                                .invalidateHttpSession(true)
                                .clearAuthentication(true)
                                .logoutRequestMatcher(new AntPathRequestMatcher("/dang-xuat"))
                                .deleteCookies("JSESSIONID")
                                .logoutSuccessUrl("/redirect-logout")
                                .permitAll()
                ).oauth2Login(
                        oauth2 -> oauth2
                                .loginPage("/dang-nhap")
                                .defaultSuccessUrl("/login-google-success")
                                .authorizationEndpoint()
                                .baseUri("/oauth2/authorization")
                                .authorizationRequestRepository(getRepository())
                                .and()
                                .tokenEndpoint()
                                .accessTokenResponseClient(getToken())
                );
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
