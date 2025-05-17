package com.main.repository;

import com.main.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Integer> {

    List<Address> findAllByUserId(int userId);

    Address findByUserId(int userId);

    Address findByIsActive(boolean isActive);
}