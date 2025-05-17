package com.main.utils;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class ParamService {

    @Autowired
    HttpServletRequest request;

    public String getString(String param, String defaultValue) {
        String name = request.getParameter(param);

        if (name != null && !name.isEmpty()) {
            return name;
        }
        return defaultValue;
    }

    public int getInt(String param, int defaultValue) {
        String name = request.getParameter(param);

        if (name != null && !name.isEmpty()) {
            return Integer.parseInt(name);
        }
        return defaultValue;
    }

    public boolean getBoolean(String param, boolean defaultValue) {
        String name = request.getParameter(param);

        if (name != null && !name.isEmpty()) {
            return Boolean.parseBoolean(name);
        }
        return defaultValue;
    }

    public Date getDate(String param, String pattern) {
        String name = request.getParameter(param);
        Date result = null;

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
            result = dateFormat.parse(name);
        } catch (Exception e) {
            throw new RuntimeException("Không đúng định dạng");
        }
        return result;
    }

    public void save(MultipartFile file, String path) {
        if (file != null && !file.isEmpty()) {
            try {
                File directory = new File(path);

                if (!directory.exists()) {
                    directory.mkdirs();
                }

                File savedFile = new File(directory.getAbsolutePath() + File.separator + file.getOriginalFilename());
                file.transferTo(savedFile);
            } catch (IOException e) {
                throw new RuntimeException("Lỗi lưu file", e);
            }
        }
    }
}
