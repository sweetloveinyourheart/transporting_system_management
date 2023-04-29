package com.busstation.repositories;

import com.busstation.entities.Ticket;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {
	@Query(value = "FROM Ticket ticket WHERE ticket.addressStart = :address_start AND ticket.addressEnd = :address_end")
    Page<Ticket> findByAddress(@Param("address_start") String addressStart, @Param("address_end") String addressEnd, Pageable pageable);
	
	@Query(value = "FROM Ticket ticket WHERE ticket.addressStart = :address_start AND ticket.addressEnd = :address_end AND ticket.price = :price")
    Page<Ticket> findByTickets(@Param("address_start") String addressStart, @Param("address_end") String addressEnd, BigDecimal price, Pageable pageable);

    Optional<Ticket> findByAddressStartAndAddressEnd(String addressStart, String addressEnd);
}
