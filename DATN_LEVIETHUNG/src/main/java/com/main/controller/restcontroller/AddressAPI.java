package com.main.controller.restcontroller;

import com.main.dto.AddressDto;
import com.main.entity.Address;
import com.main.entity.Users;
import com.main.service.AddressService;
import com.main.service.UserService;
import com.main.utils.EntityDtoUtils;
import com.main.utils.SessionAttr;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("api")
public class AddressAPI {

    @Autowired
    AddressService addressService;

    @Autowired
    UserService userService;

    @Autowired
    HttpSession session;

    @GetMapping("address/addressByUserId")
    private List<Address> listAddress() {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);
        return addressService.findAllByUserId(users.getId());
    }

    @GetMapping("address/findByAddressId/{addressId}")
    private Address findByAddressId(@PathVariable int addressId) {
        return addressService.findByAddressId(addressId);
    }

    @PostMapping("address/saveAddress/submit")
    private void submitAddress(@RequestBody AddressDto addressDto) {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);

        if (users != null) {
            addressDto.setUserId(users.getId());
        }
        addressDto.setIsActive(Boolean.FALSE);
        Address address = EntityDtoUtils.convertToDto(addressDto, Address.class);
        if (address.getIsActive()) {
            oneIsActiveTrue(addressDto.getUserId(), address);
        }
        addressService.save(address);
    }

    @PutMapping("address/updateAddress/submit")
    private void updateAddress(@RequestBody AddressDto addressDto) {
        Users users = (Users) session.getAttribute(SessionAttr.CURRENT_USER);

        if (users != null) {
            addressDto.setUserId(users.getId());
        }
        addressDto.setId(addressDto.getId());
        addressDto.setIsActive(addressDto.getIsActive());
        Address address = EntityDtoUtils.convertToDto(addressDto, Address.class);
        if (address.getIsActive()) {
            oneIsActiveTrue(addressDto.getUserId(), address);
        }
        addressService.save(address);
    }

    private void oneIsActiveTrue(int userId, Address address) {
        if (address.getIsActive()) {
            List<Address> userAddresses = addressService.findAllByUserId(userId);

            if (userAddresses != null) {
                for (Address userAddress : userAddresses) {
                    userAddress.setIsActive(false);
                    addressService.save(userAddress);
                }
            }
        }
    }
}
