package com.busstation.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(DataNotFoundException.class)
	public ResponseEntity<ErrorDetails> handleDataNotFoundException(DataNotFoundException e, WebRequest request){
		
		ErrorDetails errorDetails = new ErrorDetails(new Date(),
				e.getMessage(),request.getDescription(false));
		return new ResponseEntity<>(errorDetails,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(DataExistException.class)
	public ResponseEntity<ErrorDetails> handleDataExistException(DataExistException e, WebRequest request){
		
		ErrorDetails errorDetails = new ErrorDetails(new Date(),
				e.getMessage(),request.getDescription(false));
		return new ResponseEntity<>(errorDetails,HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(AccessDenyException.class)
	public ResponseEntity<ErrorDetails> accessDenyException(AccessDenyException e, WebRequest request){
		
		ErrorDetails errorDetails = new ErrorDetails(new Date(),
				e.getMessage(),request.getDescription(false));
		return new ResponseEntity<>(errorDetails,HttpStatus.UNAUTHORIZED);
	}
}
