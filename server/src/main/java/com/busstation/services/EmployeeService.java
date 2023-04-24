package com.busstation.services;

import com.busstation.dto.AccountDto;
import com.busstation.dto.EmployeeDTO;
import com.busstation.payload.request.EmployeeRequest;
import com.busstation.payload.response.ApiResponse;
import com.busstation.payload.response.DriverResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EmployeeService {
    Page<AccountDto> getAlLEmployee(String keyword, int pageNumber, int pageSize);

    Page<AccountDto> getAlLDriver(String keyword, int pageNumber, int pageSize);

    ApiResponse edit(String id, EmployeeRequest employeeRequest);

    DriverResponse getAllCalendarByDriver();

    Page<DriverResponse> getAllTripAlreadyCar(int pageNo, int pageSize);

}
