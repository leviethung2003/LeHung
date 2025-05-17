package com.main.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserPaymentDto {

    private String fullname;

    private String phoneNumber;

    private String provinceName;

    private String districtName;

    private String wardName;

    private String address;
}
