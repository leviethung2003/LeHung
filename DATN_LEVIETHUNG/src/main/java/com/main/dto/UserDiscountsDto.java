package com.main.dto;

import com.main.entity.Discounts;
import com.main.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDiscountsDto {

    private long id;

    private long accountId;

    private String discountCode;

    private Timestamp usedAt;

    private Users accountsByAccountId;

    private Discounts discountCodesByDiscountCode;
}
