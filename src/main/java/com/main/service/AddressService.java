package com.main.service;

import com.main.entity.Address;

import java.util.List;

public interface AddressService {

    List<Address> findAllByUserId(int userId);

    Address findByUserId(int userId);

    Address findByActiveTrue(boolean active);

    Address findByAddressId(int addressId);

    void save(Address address);
}
