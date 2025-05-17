package com.main.dto;

import com.main.entity.Roles;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Collection;

@Data
public class UsersDto implements Serializable {

    private int id;

    private String email;

    private String password;

    private String fullname;

    private String phoneNumber;

    private Boolean gender;

    private Date birth;

    private String ProvinceName;

    private String DistrictName;

    private String WardName;

    private String address;

    private Timestamp dateCreated;

    private boolean isAcctive;

    private Collection<Roles> roles;

    private String token;

    private String picture;

    private BigDecimal totalOrderPrice;

    private BigDecimal orderCount;
}