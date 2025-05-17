package com.main;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

import java.util.Locale;

@Configuration
public class I18NConfig implements WebMvcConfigurer {
    @Bean("messageSource")
    public MessageSource getMessageSource() {
        ReloadableResourceBundleMessageSource ms = new ReloadableResourceBundleMessageSource();
        ms.setDefaultEncoding("UTF-8");
        ms.setBasenames("classpath:i18n/messages", "classpath:i18n/footer", "classpath:i18n/menu");
        return ms;
    }

    @Bean("localeResolver")
    public LocaleResolver getLocaleResolver() {
        CookieLocaleResolver cookie = new CookieLocaleResolver();
        cookie.setDefaultLocale(new Locale("vi")); // Đặt ngôn ngữ mặc định (ở đây là tiếng Việt)
        cookie.setCookiePath("/");
        return cookie;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
        lci.setParamName("lang"); // Đặt tên tham số yêu cầu để thay đổi ngôn ngữ

        registry.addInterceptor(lci)
                .addPathPatterns("/**") // Áp dụng interceptor cho tất cả các đường dẫn
                .excludePathPatterns("/images/**"); // Loại trừ một số đường dẫn, chẳng hạn như "/images/"

    }
}