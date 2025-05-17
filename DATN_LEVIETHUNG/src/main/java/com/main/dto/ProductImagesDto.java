package com.main.dto;

import lombok.*;

import java.io.Serializable;

@Data
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor


public class ProductImagesDto implements Serializable {

    String id;

    String productId;

    String imagePath;
}