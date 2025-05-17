package com.main.service;

import com.main.entity.Roles;

import java.util.Collection;
import java.util.List;

public interface RoleService {

    List<Roles> findAllRoles();

    Roles findByNameRole(String nameRole);

    Roles save(Roles role);
}
