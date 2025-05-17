package com.main.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

@Data
public class AddressDto implements Serializable {

    int id;

    String toName;

    String toPhone;

    String toProvince;

    String toDistrict;

    String toWard;

    String toAddress;

    Boolean isActive;

    int userId;
}