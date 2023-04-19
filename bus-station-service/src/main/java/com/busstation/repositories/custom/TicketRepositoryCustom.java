package com.busstation.repositories.custom;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.busstation.entities.Ticket;

public interface TicketRepositoryCustom {
	Page<Ticket> searchTickets(String start, String end, Pageable pageable);
}
