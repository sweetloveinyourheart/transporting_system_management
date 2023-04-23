package com.busstation.controller;

import com.busstation.exception.DataExistException;
import com.busstation.payload.request.UserRequest;
import com.busstation.payload.response.ApiResponse;
import com.busstation.services.CsvFileService;
import com.busstation.services.UserService;

import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController(value = "userAPIofWeb")
@RequestMapping("/api/v1/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private CsvFileService csvFileService;

	@GetMapping()
	@PreAuthorize("hasAnyRole('ROLE_EMPLOYEE','ROLE_ADMIN')")
	public ResponseEntity<?> getAll(@RequestParam(value = "keyword", defaultValue = "") String keyword,
									@RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
									@RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
		return new ResponseEntity<>(userService.getAlL(keyword, pageNumber, pageSize), HttpStatus.OK);
	}

	@PutMapping("/{userId}")
	@PreAuthorize("hasAnyRole('ROLE_USER','ROLE_EMPLOYEE','ROLE_ADMIN')")
	public ResponseEntity<ApiResponse> update(@PathVariable("userId") String userId,
											  @RequestBody UserRequest userRequest) {
		return new ResponseEntity<>(userService.edit(userId, userRequest), HttpStatus.OK);
	}

	@PutMapping("/status/{userId}")
	public ResponseEntity<ApiResponse> setStatus(@PathVariable("userId") String userId) {
		return new ResponseEntity<>(userService.setStatus(userId), HttpStatus.OK);
	}

	@PutMapping("/auth/status/{userId}")
	public ResponseEntity<ApiResponse> setStatusUser(@PathVariable("userId") String userId) {
		return new ResponseEntity<>(userService.setStatus(userId), HttpStatus.OK);
	}

	@GetMapping("/export-to-csv")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public void exportUsersCSV(HttpServletResponse response) throws IOException {
		response.setContentType("text/csv");
		response.addHeader("Content-Disposition", "attachment; filename=\"users.csv\"");
		Writer writer = new OutputStreamWriter(response.getOutputStream(), StandardCharsets.UTF_8);
		csvFileService.exportUsesToCsv(writer);
	}

	@PostMapping("/import-csv-file")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public String importCsvFile(@RequestParam("file") MultipartFile file) {
		try {
			// Create a BufferedReader for the uploaded file
			BufferedReader reader = null;
			try {
				reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
			} catch (IOException e) {
				e.printStackTrace();
			}
			// Call the importCsvFile method of CsvImportService to import data
			csvFileService.importUserstoCsvFile(reader);
			return "Import Successfull";
		} catch (DataExistException ex) {
			return "Error "+ ex.getMessage();
		}
	}
}
