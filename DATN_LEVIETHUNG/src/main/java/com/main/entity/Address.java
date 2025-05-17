package com.main.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "address", schema = "solardb")
public class Address {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "to_name")
    private String toName;

    @Basic
    @Column(name = "to_phone")
    private String toPhone;

    @Basic
    @Column(name = "to_province")
    private String toProvince;

    @Basic
    @Column(name = "to_district")
    private String toDistrict;

    @Basic
    @Column(name = "to_ward")
    private String toWard;

    @Basic
    @Column(name = "to_address")
    private String toAddress;

    @Basic
    @Column(name = "is_active")
    private Boolean isActive;

    @Basic
    @Column(name = "user_id")
    private int userId;
}
