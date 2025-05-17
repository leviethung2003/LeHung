package com.main.utils;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class SessionUtils {

    public static HttpSession getSession() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getSession(true);
    }

    public static void setAttribute(String key, Object value) {
        getSession().setAttribute(key, value);
    }

    public static Object getAttribute(String key) {
        return getSession().getAttribute(key);
    }

    public static void removeAttribute(String key) {
        getSession().removeAttribute(key);
    }
}
