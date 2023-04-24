package com.busstation.controller;

import com.busstation.payload.request.TicketRequest;
import com.busstation.payload.response.TicketResponse;
import com.busstation.services.TicketService;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController(value = "ticketAPIofWeb")
@RequestMapping("/api/v1/tickets")
public class TicketController {
	@Autowired
	private TicketService ticketService;

	@GetMapping()
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> searchTicket(@RequestBody TicketRequest ticketRequest,
										  @RequestParam("pageNumber") int pageNumber, @RequestParam("pageSize") int pageSize) {
		Page<TicketResponse> ticketResponse = ticketService.searchTicket(ticketRequest, pageNumber, pageSize);
		return new ResponseEntity<>(ticketResponse, HttpStatus.OK);
	}

	@GetMapping("/search")
	public ResponseEntity<?> searchTickets(@RequestParam(value = "start", defaultValue = "") String start,
										   @RequestParam(value = "end", defaultValue = "") String end,
										   @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
										   @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
		return new ResponseEntity<>(ticketService.searchTickets(start,end , pageNumber, pageSize), HttpStatus.OK);
	}

	@GetMapping("/export")
	public ResponseEntity<?> exportTicket() {
		if (ticketService.exportTicket()) {
			return new ResponseEntity<>("Export file excel successfully !", HttpStatus.OK);
		}
		return new ResponseEntity<>("Export file excel failed", HttpStatus.OK);
	}

	@GetMapping("/{ticketId}")
	public ResponseEntity<?> getTicketById(@PathVariable("ticketId") String ticketId) {
		TicketResponse ticketResponse = ticketService.getTicketById(ticketId);
		return new ResponseEntity<>(ticketResponse, HttpStatus.OK);
	}

	@PostMapping("/import")
	public ResponseEntity<?> importTicket(@RequestParam("file") MultipartFile file) {
		try {
			List<TicketResponse> ticketResponses = ticketService.importTicket(file);
			return new ResponseEntity<>(ticketResponses, HttpStatus.OK);
		} catch (IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>("Import file excel failed", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping()
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> createTicket(@RequestBody TicketRequest ticketRequest) {
		TicketResponse ticketResponse = ticketService.addTicket(ticketRequest);
		return new ResponseEntity<>(ticketResponse, HttpStatus.CREATED);
	}

	@PutMapping("/{ticketId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateTicket(@RequestBody TicketRequest ticketRequest,
										  @PathVariable("ticketId") String ticketId) {
		ticketService.updateTicket(ticketId, ticketRequest);
		return new ResponseEntity<>("Updated !!!", HttpStatus.OK);
	}

	@DeleteMapping("/{ticketId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> deleteTicket(@PathVariable("ticketId") String ticketId) {
		if (ticketService.deleteTicket(ticketId)) {
			return new ResponseEntity<>("Deleted !!!", HttpStatus.OK);
		}
		return new ResponseEntity<>("Delete failed !!!", HttpStatus.BAD_GATEWAY);
	}

}
