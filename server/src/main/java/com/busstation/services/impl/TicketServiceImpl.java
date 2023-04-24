package com.busstation.services.impl;

import com.busstation.common.Constant;
import com.busstation.entities.Ticket;
import com.busstation.payload.request.TicketRequest;
import com.busstation.payload.response.TicketResponse;
import com.busstation.repositories.TicketRepository;
import com.busstation.repositories.custom.TicketRepositoryCustom;
import com.busstation.services.TicketService;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

// NOTE : No exception handling

@Service
public class TicketServiceImpl implements TicketService {
	@Autowired
	private TicketRepository ticketRepository;

	@Autowired
	private TicketRepositoryCustom ticketRepositoryCustom;

	private static final String FILE_PATH = Constant.EXCEL_PARH + "/tickets.xlsx";

	@Override
	public TicketResponse addTicket(TicketRequest request) {

		Ticket ticket = new Ticket();
		ticket.setAddressEnd(request.getAddressEnd());
		ticket.setAddressStart(request.getAddressStart());
		ticket.setPrice(request.getPrice());
		ticket.setPickupLocation(request.getPickupLocation());
		ticket.setDropOffLocation(request.getDropOffLocation());
		ticketRepository.save(ticket);

		Ticket newTicket = ticketRepository.save(ticket);
		TicketResponse ticketResponse = new TicketResponse();
		ticketResponse.setTicketId(newTicket.getTicketId());
		ticketResponse.setAddressStart(newTicket.getAddressStart());
		ticketResponse.setAddressEnd(newTicket.getAddressEnd());
		ticketResponse.setPrice(newTicket.getPrice());
		ticketResponse.setPickupLocation(newTicket.getPickupLocation());
		ticketResponse.setDropOffLocation(newTicket.getDropOffLocation());

		return ticketResponse;
	}

	@Override
	public TicketResponse updateTicket(String ticketId, TicketRequest request) {

		Ticket ticket = ticketRepository.findById(ticketId)
				.orElseThrow(() -> new RuntimeException("Ticket does not exist"));

		ticket.setAddressEnd(request.getAddressEnd());
		ticket.setAddressStart(request.getAddressStart());
		ticket.setPrice(request.getPrice());
		ticket.setPickupLocation(request.getPickupLocation());
		ticket.setDropOffLocation(request.getDropOffLocation());

		ticketRepository.save(ticket);

		TicketResponse ticketResponse = new TicketResponse(ticket.getTicketId(), ticket.getAddressStart(),
				ticket.getAddressEnd(), ticket.getPrice(), ticket.getPickupLocation(), ticket.getDropOffLocation());

		return ticketResponse;
	}

	@Override
	public boolean deleteTicket(String ticketId) {
		Ticket ticket = ticketRepository.findById(ticketId)
				.orElseThrow(() -> new RuntimeException("Ticket does not exist"));
		ticketRepository.delete(ticket);

		return true;
	}

	@Override
	public Page<TicketResponse> searchTicket(TicketRequest ticketRequest, int pageNumber, int pageSize) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("price").ascending());
		if (ticketRequest.getAddressStart() == null || ticketRequest.getAddressEnd() == null) {
			Page<Ticket> ticket = ticketRepository.findAll(pageable);
			Page<TicketResponse> ticketResponse = ticket.map(TicketResponse::new);
			return ticketResponse;
		}

		if (ticketRequest.getPrice() == null) {
			Page<Ticket> ticket = ticketRepository.findByAddress(ticketRequest.getAddressStart(),
					ticketRequest.getAddressEnd(), pageable);
			Page<TicketResponse> ticketResponse = ticket.map(TicketResponse::new);
			return ticketResponse;
		}

		Page<Ticket> ticket = ticketRepository.findByTickets(ticketRequest.getAddressStart(),
				ticketRequest.getAddressEnd(), ticketRequest.getPrice(), pageable);
		Page<TicketResponse> ticketResponse = ticket.map(TicketResponse::new);
		return ticketResponse;
	}

	@Override
	public TicketResponse getTicketById(String ticketId) {
		ticketRepository.findById(ticketId).orElseThrow(() -> new RuntimeException("Ticket does not exist"));

		Ticket ticket = ticketRepository.getReferenceById(ticketId);
		TicketResponse ticketResponse = new TicketResponse();
		ticketResponse.setTicketId(ticket.getTicketId());
		ticketResponse.setAddressStart(ticket.getAddressStart());
		ticketResponse.setAddressEnd(ticket.getAddressEnd());
		ticketResponse.setPrice(ticket.getPrice());
		ticketResponse.setPickupLocation(ticket.getPickupLocation());
		ticketResponse.setDropOffLocation(ticket.getDropOffLocation());

		return ticketResponse;
	}

	@Override
	public boolean exportTicket() {
		try (Workbook workbook = new XSSFWorkbook()) {
			File dataDir = new File(Constant.EXCEL_PARH);
			if (!dataDir.exists()) {
				dataDir.mkdir();
			}

			List<Ticket> tickets = ticketRepository.findAll();
			Sheet sheet = workbook.createSheet("Tickets");

			Row header = sheet.createRow(0);
			header.createCell(0).setCellValue("ID");
			header.createCell(1).setCellValue("Address Start");
			header.createCell(2).setCellValue("Address End");
			header.createCell(3).setCellValue("Price");
			header.createCell(4).setCellValue("Pickup Location");
			header.createCell(5).setCellValue("Drop Off Location");

			for (int i = 0; i < tickets.size(); i++) {
				Ticket ticket = tickets.get(i);
				Row row = sheet.createRow(i + 1);
				row.createCell(0).setCellValue(ticket.getTicketId());
				row.createCell(1).setCellValue(ticket.getAddressStart());
				row.createCell(2).setCellValue(ticket.getAddressEnd());
				row.createCell(3).setCellValue(ticket.getPrice().toString());
				row.createCell(4).setCellValue(ticket.getPickupLocation());
				row.createCell(5).setCellValue(ticket.getDropOffLocation());
			}

			try (FileOutputStream fileOutputStream = new FileOutputStream(FILE_PATH)) {
				workbook.write(fileOutputStream);
				return true;
			} catch (IOException e) {
				e.printStackTrace();
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
		return true;
	}

	@Override
	public List<TicketResponse> importTicket(MultipartFile file) throws IOException {
		List<TicketResponse> ticketResponses = new ArrayList<>();

		try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
			Sheet sheet = workbook.getSheetAt(0);
			Iterator<Row> rows = sheet.iterator();

			if (rows.hasNext()) {
				rows.next();
			}

			while (rows.hasNext()) {
				Row row = rows.next();

				String ticketId = row.getCell(0).getStringCellValue();
				String addressStart = row.getCell(1).getStringCellValue();
				String addressEnd = row.getCell(2).getStringCellValue();

// Exception :	BigDecimal price = (BigDecimal) row.getCell(3).getNumericCellValue();
				Cell cell = row.getCell(3);
				BigDecimal price = null;
				if (cell.getCellType() == CellType.NUMERIC) {
					price = new BigDecimal(cell.getNumericCellValue());
				} else if (cell.getCellType() == CellType.STRING) {
					price = new BigDecimal(cell.getStringCellValue());
				}
				
				String pickupLocation = row.getCell(4).getStringCellValue();
				String dropOffLocation = row.getCell(5).getStringCellValue();
				
				Ticket ticket = new Ticket(ticketId ,addressStart, addressEnd, price, pickupLocation , dropOffLocation);
				ticketRepository.save(ticket);
				TicketResponse ticketResponse = new TicketResponse(ticketId, addressStart, addressEnd, price ,  pickupLocation , dropOffLocation);
				ticketResponses.add(ticketResponse);
			}
			
			

		} catch (IOException e) {
			e.printStackTrace();
			throw e;
		}

		return ticketResponses;
	}

	@Override
	public Page<TicketResponse> searchTickets(String start, String end, int pageNumber, int pageSize) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("addressStart").ascending());
		Page<Ticket> tickets = ticketRepositoryCustom.searchTickets(start, end, pageable);
		Page<TicketResponse> ticketResponse = tickets.map(TicketResponse::new);
		return ticketResponse;
	}

}
