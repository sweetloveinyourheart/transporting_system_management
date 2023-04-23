
package com.busstation.services.impl;

import com.busstation.dto.AccountDto;
import com.busstation.dto.EmployeeDTO;
import com.busstation.entities.*;
import com.busstation.enums.NameRoleEnum;
import com.busstation.exception.DataNotFoundException;
import com.busstation.payload.request.EmployeeRequest;
import com.busstation.payload.response.*;
import com.busstation.repositories.*;
import com.busstation.repositories.custom.UserRepositoryCustom;
import com.busstation.services.EmployeeService;
import com.busstation.utils.GetUserUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepositoryCustom userRepositoryCustom;

    @Override
    public Page<AccountDto> getAlLEmployee(String keyword, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Account> users = userRepositoryCustom.getFilter(keyword, NameRoleEnum.ROLE_EMPLOYEE.toString(), pageable);
        Page<AccountDto> accountDtos = users.map(AccountDto::new);
        return accountDtos;
    }

    public Page<AccountDto> getAlLDriver(String keyword, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Account> users = userRepositoryCustom.getFilter(keyword, NameRoleEnum.ROLE_DRIVER.toString(), pageable);
        Page<AccountDto> accountDtos = users.map(AccountDto::new);
        return accountDtos;
    }

    @Override
    @Transactional
    public ApiResponse edit(String id, EmployeeRequest employeeRequest) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Can't find this employee"));
        System.out.println("aaa");
        employee.setDob(employeeRequest.getDob());
        employee.setYoe(employeeRequest.getYoe());
        employeeRepository.save(employee);
        return new ApiResponse("Updated successfully", HttpStatus.OK);
    }

    @Override
    public DriverResponse getAllCalendarByDriver() {

        Account account = accountRepository.findByusername(new GetUserUtil().GetUserName());

        User user = userRepository.findById(account.getUser().getUserId()).orElseThrow(() -> new DataNotFoundException("User does not exist"));

        Employee employee = employeeRepository.findByUser(user);

        Car car = employee.getCar();
        if (Objects.isNull(car))
            return null;

        if (Objects.isNull(car.getTrips()))
            return null;

        List<TripResponse> tripResponses = new ArrayList<>();

        for (Trip trip : car.getTrips()) {
            Optional<Ticket> checkTicket = ticketRepository
                    .findByAddressStartAndAddressEnd(trip.getProvinceStart(), trip.getProvinceEnd());

            if (checkTicket.isPresent()){
                Ticket ticket = checkTicket.get();

                TripResponse tripResponse = new TripResponse(trip.getTripId(), trip.getProvinceStart(),
                        trip.getProvinceEnd(), trip.getTimeStart(), ticket.getPrice(),trip.getStatus(),
                        ticket.getPickupLocation(), ticket.getDropOffLocation());

                tripResponses.add(tripResponse);
            }
        }

        CarResponse carResponse = new CarResponse();
        carResponse.setCarId(car.getCarId());
        carResponse.setCarNumber(car.getCarNumber());
        carResponse.setStatus(car.getStatus());

        DriverResponse driverResponse = new DriverResponse(carResponse,tripResponses);


        return driverResponse;
    }

    @Override
    public Page<DriverResponse> getAllTripAlreadyCar(int pageNo, int pageSize) {

        int pageNumber = pageNo - 1;

        if(pageNumber < 0)
            pageNumber=0;

        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Employee> employees = employeeRepository.findAllByCarIsNotNull(pageable);

        List<DriverResponse> driverResponses = new ArrayList<>();

        for(Employee employee : employees){

            Car car = employee.getCar();

            if (Objects.isNull(car.getTrips()))
                return null;

            List<TripResponse> tripResponses = new ArrayList<>();

            for (Trip trip : car.getTrips()) {
                Optional<Ticket> checkTicket = ticketRepository
                        .findByAddressStartAndAddressEnd(trip.getProvinceStart(), trip.getProvinceEnd());

                if (checkTicket.isPresent()){
                    Ticket ticket = checkTicket.get();

                    TripResponse tripResponse = new TripResponse(trip.getTripId(), trip.getProvinceStart(),
                            trip.getProvinceEnd(), trip.getTimeStart(), ticket.getPrice(),trip.getStatus(),
                            ticket.getPickupLocation(), ticket.getDropOffLocation());

                    tripResponses.add(tripResponse);
                }
            }

            CarResponse carResponse = new CarResponse();
            carResponse.setCarId(car.getCarId());
            carResponse.setCarNumber(car.getCarNumber());
            carResponse.setStatus(car.getStatus());

            DriverResponse driverResponse = new DriverResponse(carResponse, tripResponses);
            driverResponses.add(driverResponse);
        }

        Page<DriverResponse> driverResponsePage = new PageImpl<>(driverResponses, pageable, employees.getTotalElements());

        return driverResponsePage;
    }
}
