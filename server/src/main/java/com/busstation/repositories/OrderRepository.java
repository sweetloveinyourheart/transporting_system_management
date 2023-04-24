package com.busstation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.busstation.entities.Order;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String>{

    List<Order> findAllByTrip_TripId(String tripId);

    @Query("SELECT COUNT(o) FROM Order o "
    	       + "WHERE EXTRACT(MONTH FROM o.createAt) = ?1 "
    	       + "AND EXTRACT(YEAR FROM o.createAt) = ?2")
    Integer countOrdersByMonthAndYear(Integer month, Integer year);
}
