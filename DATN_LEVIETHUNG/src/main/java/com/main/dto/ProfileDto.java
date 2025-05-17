package com.main.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Date;


@Getter
@Setter
public class ProfileDto implements Serializable {

    String fullname;

    String phoneNumber;

    Boolean gender;

    Date birth;

    String ProvinceName;

    String DistrictName;

    String WardName;

    String address;

}
