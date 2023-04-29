package com.busstation.payload.request;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor

public class TicketRequest {
	private String addressStart;
	private String addressEnd;
	private BigDecimal price;
	private String pickupLocation;
	private String dropOffLocation ;
}
