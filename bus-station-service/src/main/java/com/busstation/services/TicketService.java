package com.busstation.services;

import com.busstation.payload.request.TicketRequest;
import com.busstation.payload.response.TicketResponse;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface TicketService {

	TicketResponse getTicketById(String ticketId);

	TicketResponse addTicket(TicketRequest request);

	TicketResponse updateTicket(String ticketId, TicketRequest request);

	boolean deleteTicket(String ticketId);

	Page<TicketResponse> searchTicket(TicketRequest ticketRequest, int pageNumber, int pageSize);

	Page<TicketResponse> searchTickets(String start, String end, int pageNumber, int pageSize);

	boolean exportTicket();

	List<TicketResponse> importTicket(MultipartFile file) throws IOException;
}
