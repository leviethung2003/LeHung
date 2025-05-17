package com.main.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductsDto implements Serializable {

    String id;

    @NotNull(message = "Loại sản phẩm không được trống")
    Integer productTypeId;

    @NotBlank(message = "Thương hiệu không được trống")
    String productBrandId;

    @NotBlank(message = "Tên sản phẩm không được trống")
    String productName;

    @NotNull(message = "Giá không được trống")
    @Min(value = 0, message = "Giá phải lớn hơn hoặc bằng 0")
    BigDecimal price;

    @NotNull(message = "Số lượng không được trống")
    @Min(value = 0, message = "Số lượng phải lớn hơn hoặc bằng 0")
    Integer quantity;

    @NotBlank(message = "Mô tả sản phẩm không được trống")
    String descriptions;

    @NotBlank(message = "Mô tả chỉ tiết sản phẩm không được trống")
    String templateDescription;

    @NotBlank(message = "Công suất không được trống")
    String powers;

    @NotBlank(message = "Warranty không được trống")
    String warranty;

    String isStatusDelete;

    @NotNull(message = "Date Created không được trống")
    Timestamp dateCreated;
}