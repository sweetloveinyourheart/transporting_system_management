package com.busstation.services;

import com.busstation.payload.request.EmployeeRequest;
import com.busstation.payload.request.LoginRequest;
import com.busstation.payload.request.SignupRequest;
import com.busstation.payload.response.ApiResponse;
import com.busstation.payload.response.JwtResponse;


public interface AuthService {
    JwtResponse signin(LoginRequest loginRequest);
    ApiResponse signUpUser(SignupRequest signupRequest);
    ApiResponse signUpEmployee(String accountId, EmployeeRequest employeeRequest);
    ApiResponse signUpForEmployees( SignupRequest signupRequest);

}
