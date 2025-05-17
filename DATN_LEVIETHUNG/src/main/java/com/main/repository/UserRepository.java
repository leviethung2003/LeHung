package com.main.repository;

import com.main.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Integer> {

    Optional<Users> findByEmail(String email);

    Users findUserByEmail(String email);

    Users findByToken(String token);

    Users findByPhoneNumber(String phoneNumber);

    Users findById(int userId);

    @Query("SELECT u FROM Users u " +
            "LEFT JOIN FETCH u.roles r " +
            "WHERE r.nameRole LIKE 'ROLE_ADMIN' " +
            "OR r.nameRole LIKE 'ROLE_STAFF' " +
            "OR r.nameRole LIKE 'ROLE_USER'" +
            "ORDER BY CASE WHEN 'ROLE_ADMIN' IN (SELECT role.nameRole FROM u.roles role) THEN 0 ELSE 1 END, u.dateCreated DESC")
    List<Users> findStaffByActiveIsTrue();

    @Query("SELECT u FROM Users u JOIN u.roles r  WHERE  r.nameRole LIKE 'ROLE_USER' ORDER BY u.dateCreated DESC")
    List<Users> findUserByActiveIsTrue();

    @Query("SELECT u.id FROM Users u WHERE u.phoneNumber = :phoneNumber AND u.id <> :currentUserId")
    Integer findIdByPhoneNumberAndNotCurrentUser(@Param("phoneNumber") String phoneNumber, @Param("currentUserId") Integer currentUserId);

    @Query("SELECT u FROM Users u JOIN u.roles r  WHERE u.isAcctive = true AND r.nameRole LIKE 'ROLE_USER' AND u.email = :email")
    Users findUserByRoleAndActive(String email);
}
