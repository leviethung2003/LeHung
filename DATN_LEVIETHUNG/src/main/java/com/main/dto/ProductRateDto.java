package com.main.dto;

import com.main.dto.ProductRateImage;
import com.main.entity.Products;
import com.main.entity.Users;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collection;

@Getter @Setter
@NoArgsConstructor
@ToString

public class ProductRateDto {
    private String id;
    private String userId;
    private String productName;
    private LocalDateTime dateCreated;
    private String content;
    private String reviewStatus;
    private String fullName;
    private int rate;
    private String picture;
    private Collection<ProductRateImage> images;


    public ProductRateDto(String id, String userId, String productName, LocalDateTime dateCreated, String content, String reviewStatus, String fullName, int rate, String picture, Collection<ProductRateImage> images) {
        this.id = id;
        this.userId = userId;
        this.productName = productName;
        this.dateCreated = dateCreated;
        this.content = content;
        this.reviewStatus = reviewStatus;
        this.fullName = fullName;
        this.rate = rate;
        this.picture = picture;
        this.images = images;
    }
    // getters and setters
}


