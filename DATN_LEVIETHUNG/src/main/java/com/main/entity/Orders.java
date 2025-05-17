package com.main.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders", schema = "solardb")
public class Orders {

    @Id
    @Column(name = "id", nullable = false, length = 20)
    private String id;

    @Basic
    @Column(name = "user_id", nullable = true)
    private Integer userId;

    @Basic
    @Column(name = "payment_type", nullable = true)
    private Boolean paymentType;

    @Column(name = "payment_status", nullable = true)
    private Integer paymentStatus;

    @Basic
    @Column(name = "discount_id", nullable = true, length = 20)
    private String discountId;

    @Basic
    @Column(name = "order_status", nullable = true, length = 30)
    private String orderStatus;

    @Basic
    @Column(name = "order_ship_cost", nullable = true, precision = 0)
    private BigDecimal orderShipCost;

    @Basic
    @Column(name = "to_name", nullable = true, length = 100)
    private String toName;

    @Basic
    @Column(name = "to_phone", nullable = true, length = 20)
    private String toPhone;

    @Basic
    @Column(name = "to_email", nullable = true, length = 100)
    private String toEmail;

    @Basic
    @Column(name = "to_province", nullable = true, length = 50)
    private String toProvince;

    @Basic
    @Column(name = "to_district", nullable = true, length = 50)
    private String toDistrict;

    @Basic
    @Column(name = "to_ward", nullable = true, length = 50)
    private String toWard;

    @Basic
    @Column(name = "to_address", nullable = true, length = -1)
    private String toAddress;

    @Basic
    @Column(name = "order_note", nullable = true, length = 255)
    private String orderNote;

    @Basic
    @Column(name = "order_note_cancelled", nullable = true, length = 255)
    private String orderNoteCancelled;

    @Basic
    @Column(name = "date_created", nullable = true)
    private Timestamp dateCreated;

    @Basic
    @Column(name = "date_payment", nullable = true)
    private Timestamp datePayment;

    @Basic
    @Column(name = "date_receive", nullable = true)
    private Timestamp dateReceive;

    @Basic
    @Column(name = "date_expected", nullable = true, length = 50)
    private String dateExpected;

    @OneToMany(mappedBy = "ordersByOrderId")
    @JsonManagedReference
    private Collection<OrderItems> orderItemsById;

    @OneToMany(mappedBy = "ordersByOrderId")
    @JsonManagedReference
    private Collection<NotificationOrder> notificationOrderById;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonBackReference
    private Users usersByUserId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "discount_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonBackReference
    private Discounts discountsByDiscountId;
}
