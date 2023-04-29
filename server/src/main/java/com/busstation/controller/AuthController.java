package com.busstation.controller;

import com.busstation.payload.request.EmployeeRequest;
import com.busstation.payload.request.LoginRequest;
import com.busstation.payload.request.SignupRequest;
import com.busstation.payload.response.JwtResponse;
import com.busstation.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController(value = "authAPIofWeb")
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> signIn(@RequestBody LoginRequest loginRequest) {
        return new ResponseEntity<>(authService.signin(loginRequest), HttpStatus.OK);
    }
    @PostMapping("/signupuser")
    public ResponseEntity<?> signUpUser(@RequestBody SignupRequest signupRequest) {
        return new ResponseEntity<>(  authService.signUpUser(signupRequest),HttpStatus.CREATED);
    }
    @PostMapping("/signupemployee/{accountid}")
    public ResponseEntity<?> signUpEmployee(@PathVariable("accountid") String accountId,@RequestBody EmployeeRequest employeeRequest) {
        return new ResponseEntity<>(  authService.signUpEmployee(accountId,employeeRequest),HttpStatus.CREATED);
    }
    @PostMapping("/signupforemployee")
    public ResponseEntity<?> signUpForEmployees(@RequestBody SignupRequest signupRequest) {
        return new ResponseEntity<>(  authService.signUpForEmployees(signupRequest),HttpStatus.CREATED);
    }
}
