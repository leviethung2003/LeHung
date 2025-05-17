package com.main.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

@Data
public class RolesDto implements Serializable {

    int id;

    String nameRole;
}