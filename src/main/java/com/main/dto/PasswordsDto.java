package com.main.dto;

import lombok.Data;

@Data
public class PasswordsDto {
    private String email;

    private String verifyCode;

    private String full_name;
}
