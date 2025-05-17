package com.main.dto;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class BannerWordsDto {
    private int id;

    @NotNull(message = "Không được bỏ trống trường từ cấm")
    private String word;
}
