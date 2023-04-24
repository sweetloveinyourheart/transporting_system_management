package com.busstation.controller;

import com.busstation.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController(value = "calendarAPIofWeb")
@RequestMapping("/api/v1/Calendars")
public class CalendarController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping()
    @PreAuthorize("hasRole('ROLE_DRIVER')")
    public ResponseEntity<?> getAllCalendarByDriver() {
        return new ResponseEntity<>(employeeService.getAllCalendarByDriver(), HttpStatus.OK);
    }

    @GetMapping("/getAllTripAlreadyCar")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYEE','ROLE_ADMIN')")
    public ResponseEntity<?> getAllTripAlreadyCar(@RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
                                                  @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
        return new ResponseEntity<>(employeeService.getAllTripAlreadyCar(pageNo,pageSize), HttpStatus.OK);
    }
}