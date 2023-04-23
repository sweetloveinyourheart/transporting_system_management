package com.busstation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO {
	
	private Object data;
	private int page;
	private int totalPages;
	private String message;
	private String detail;

}
