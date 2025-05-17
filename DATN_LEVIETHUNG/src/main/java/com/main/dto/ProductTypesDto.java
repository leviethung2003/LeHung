package com.main.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

@Data
public class ProductTypesDto implements Serializable {

    int id;

    int categoryId;

    String productTypeName;

    Boolean isActive;
}