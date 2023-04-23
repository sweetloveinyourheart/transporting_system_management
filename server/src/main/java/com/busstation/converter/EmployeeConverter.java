package com.busstation.converter;

import com.busstation.dto.EmployeeDTO;
import com.busstation.entities.Employee;
import com.busstation.payload.request.EmployeeRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EmployeeConverter {
    @Autowired
    private ModelMapper modelMapper;

    public Employee converToEntity(EmployeeRequest employeeRequest) {

        Employee employee = modelMapper.map(employeeRequest, Employee.class);
        return employee;
    }

    public EmployeeDTO converToDto(Employee employee) {

        EmployeeDTO employeeDTO = modelMapper.map(employee, EmployeeDTO.class);
        return employeeDTO;
    }

}
