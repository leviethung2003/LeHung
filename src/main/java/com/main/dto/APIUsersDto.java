package com.main.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class APIUsersDto implements Serializable {

    private int id;

    private String email;
}