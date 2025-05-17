package com.main.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

@Data
public class ProductBrandsDto implements Serializable {

    String id;

    String brandName;

    String countryOfOrigin;

    String brandDescription;

    String websiteUrl;

    String brandPhoneNumber;

    String isStatusDelete;
}