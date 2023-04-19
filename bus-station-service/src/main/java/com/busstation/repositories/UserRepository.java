package com.busstation.repositories;

import com.busstation.entities.Order;
import com.busstation.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query(value = "SELECT user FROM User user WHERE user.email LIKE %:keyword% or user.phoneNumber  LIKE %:keyword%")
    Page<User> findAllByEmailOrPhoneNumber(@Param("keyword") String keyword, Pageable pageable);

    Page<User> findByTrips_TripId(String tripId, Pageable pageable);

    List<User> findAllByTrips_TripId(String tripId);

    Boolean existsByEmail(String email);

    User findUserByOrders(Order order);
}
