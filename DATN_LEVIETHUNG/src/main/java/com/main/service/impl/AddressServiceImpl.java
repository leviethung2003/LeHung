package com.main.service.impl;

import com.main.entity.Address;
import com.main.repository.AddressRepository;
import com.main.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<Address> findAllByUserId(int userId) {
        return addressRepository.findAllByUserId(userId);
    }

    @Override
    public Address findByUserId(int userId) {
        return addressRepository.findByUserId(userId);
    }

    @Override
    public Address findByActiveTrue(boolean active) {
        return addressRepository.findByIsActive(active);
    }

    @Override
    public Address findByAddressId(int addressId) {
        return addressRepository.getReferenceById(addressId);
    }

    @Override
    public void save(Address address) {
        addressRepository.save(address);
    }
}
