package com.main.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", schema = "solardb")
public class Users {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Basic
    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Basic
    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Basic
    @Column(name = "fullname", nullable = false, length = 100)
    private String fullname;

    @Basic
    @Column(name = "phone_number", nullable = true, length = 20)
    private String phoneNumber;

    @Basic
    @Column(name = "gender", nullable = true)
    private Boolean gender;

    @Basic
    @Column(name = "birth", nullable = true)
    private Date birth;

    @Basic
    @Column(name = "province_name", nullable = true, length = 50)
    private String ProvinceName;

    @Basic
    @Column(name = "district_name", nullable = true, length = 50)
    private String DistrictName;

    @Basic
    @Column(name = "ward_name", nullable = true, length = 50)
    private String WardName;

    @Basic
    @Column(name = "address", nullable = true, length = 100)
    private String address;

    @Basic
    @Column(name = "date_created", nullable = true)
    private Timestamp dateCreated;

    @Basic
    @Column(name = "is_active", nullable = false)
    private boolean isAcctive;

    @Basic
    @Column(name = "token", nullable = true, length = 50)
    private String token;

    @Basic
    @Column(name = "picture", nullable = true, length = 255)
    private String picture;

    @OneToMany(mappedBy = "usersByUserId")
    @JsonManagedReference
    private Collection<Carts> cartsById;

    @OneToMany(mappedBy = "usersByUserId")
    @JsonManagedReference
    private Collection<Orders> ordersById;

    @OneToMany(mappedBy = "usersByUserId")
    @JsonManagedReference
    private Collection<ProductRate> productRatesById;

    @OneToMany(mappedBy = "usersByUserId")
    @JsonManagedReference
    private Collection<UserDiscounts> userDiscountsById;

    @OneToMany(mappedBy = "usersByUserId")
    @JsonManagedReference
    private Collection<NotificationOrder> notificationUserById;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "role_users", joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")}, inverseJoinColumns = {@JoinColumn(name = "role_id", referencedColumnName = "id")})
    @JsonIgnoreProperties("users") // Tùy chỉnh tên trường cần bỏ qua
    private List<Roles> roles = new ArrayList<>();
}
