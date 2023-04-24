package com.busstation.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class ApiResponse {

	private String message;
	private HttpStatus http;
}
