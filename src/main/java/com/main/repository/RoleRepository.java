package com.main.repository;

import com.main.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Roles, Integer> {

    Roles findByNameRole(String name);
}