package com.busstation.services.impl;

import com.busstation.entities.Car;
import com.busstation.entities.Chair;
import com.busstation.entities.Employee;
import com.busstation.entities.Trip;
import com.busstation.enums.RoleEnum;
import com.busstation.exception.DataExistException;
import com.busstation.exception.DataNotFoundException;
import com.busstation.payload.request.CarRequest;
import com.busstation.payload.request.ChairRequest;
import com.busstation.payload.response.ApiResponse;
import com.busstation.payload.response.CarResponse;
import com.busstation.payload.response.ChairResponse;
import com.busstation.repositories.CarRepository;
import com.busstation.repositories.ChairRepository;
import com.busstation.repositories.EmployeeRepository;
import com.busstation.repositories.TripRepository;
import com.busstation.services.CarService;
import com.busstation.services.ChairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;


@Service
public class CarServiceImpl implements CarService {
    @Autowired
    private CarRepository carRepository;
    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private ChairRepository chairRepository;
    @Autowired
    private ChairService chairService;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public CarResponse updatedCar(String carId, CarRequest request) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new RuntimeException("Car does not exist"));
        Trip trip = tripRepository.findById(request.getTripId()).orElseThrow(() -> new RuntimeException("Trip does not exist"));

        car.setStatus(request.getStatus());
        car.setCarNumber(request.getCarNumber());
        car.setTrips(Collections.singleton(trip));
        carRepository.save(car);

        CarResponse response = new CarResponse();
        response.setCarId(car.getCarId());
        response.setCarNumber(car.getCarNumber());
        response.setStatus(car.getStatus());
        response.setChair(setupChairResponse(car));
        response.setTripId(Collections.singletonList(trip.getTripId()));

        return response;
    }


    @Override
    public CarResponse addCar(CarRequest request) {
//        //Trip trip = tripRepository.findById(request.getTripId()).orElseThrow(()
//                -> new DataNotFoundException("Trip id does not exist"));
        Car car = new Car();
        car.setStatus(request.getStatus());

        Optional<Car> existingCar = carRepository.findByCarNumber(request.getCarNumber());
        if (existingCar.isPresent()) {
            throw new DataExistException("CarNumber Existed");
        }
        car.setCarNumber(request.getCarNumber());
        car.setStatus(true);
//     // car.setTrips(Collections.singleton(trip));

        Car newCar = carRepository.save(car);

        for (int i = 0; i < request.getNumberOfChair(); i++) {

            ChairRequest chairRequest = new ChairRequest();
            chairRequest.setChairNumber(i + 1);
            chairRequest.setCarId(car.getCarId());
            chairRequest.setStatus(true);
            chairService.addChair(chairRequest);

        }


        CarResponse carResponse = new CarResponse();
        carResponse.setCarId(newCar.getCarId());
        carResponse.setStatus(newCar.getStatus());
        carResponse.setCarNumber(newCar.getCarNumber());
        carResponse.setChair(setupChairResponse(car));
        //carResponse.setTripId(Collections.singletonList(trip.getTripId()));
        return carResponse;
    }

    @Override
    public ApiResponse addDriverForCar(String employeeId, String carId) {

        Optional<Employee> employee = employeeRepository.findById(employeeId);
        Optional<Car> car = carRepository.findById(carId);

        if (employee.isEmpty() || car.isEmpty())
            return new ApiResponse("Employee, car does not exist", HttpStatus.OK);
        if (!employee.get().getUser().getAccount().getRole().getRoleId().equals(RoleEnum.DRIVER.toString()))
            return new ApiResponse("employee is not a driver", HttpStatus.OK);
        if (employee.get().getCar() != null)
            return new ApiResponse("Driver has a car", HttpStatus.OK);
        employee.get().setCar(car.get());
        employeeRepository.save(employee.get());

        return new ApiResponse("Add Successfully", HttpStatus.OK);
    }

    @Override
    public ApiResponse addTripForCar(String tripId, String carId) {

        Optional<Trip> trip = tripRepository.findById(tripId);
        Optional<Car> car = carRepository.findById(carId);

        if (trip.isEmpty() || car.isEmpty())
            return new ApiResponse("Trip, car does not exist", HttpStatus.OK);
        if(trip.get().getTimeStart().compareTo(LocalDateTime.now()) < 0){
            return new ApiResponse("trip at time start '"+trip.get().getTimeStart()+"' has passed", HttpStatus.OK);
        }
        List<Trip> trips = tripRepository.findAllByCar(car.get());
        for (Trip itemTrip : trips) {
            if (itemTrip.getTimeStart().compareTo(trip.get().getTimeStart()) == 0) {
                return new ApiResponse("The car has a trip at " + itemTrip.getTimeStart(), HttpStatus.OK);
            }
        }
        trip.get().getCars().add(car.get());
        tripRepository.save(trip.get());
        return new ApiResponse("Add Successfully", HttpStatus.OK);
    }

    @Override
    public List<CarResponse> getAllCar() {
        List<Car> cars = carRepository.findAll();

        List<CarResponse> carResponses = new ArrayList<>();
        List<String> tripId = new ArrayList<>();


        for (Car car : cars) {
            CarResponse carResponse = new CarResponse();
            carResponse.setCarId(car.getCarId());
            carResponse.setCarNumber(car.getCarNumber());
            List<Trip> trip = tripRepository.findAllByCars(car);
            for (Trip itemTrip : trip) {
                tripId.add(itemTrip.getTripId());
            }
            carResponse.setTripId(tripId);
            carResponse.setStatus(car.getStatus());
            List<ChairResponse> chairResponses = new ArrayList<>();
            for (Chair chair : car.getChairs()) {
                ChairResponse chairRes = new ChairResponse();
                chairRes.setChairId(chair.getChairId());
                chairRes.setChairNumber(chair.getChairNumber());
                chairRes.setCarId(chair.getCar().getCarId());
                chairRes.setStatus(chair.getStatus());

                chairResponses.add(chairRes);
            }

            carResponse.setChair(chairResponses);
            carResponses.add(carResponse);

        }

        return carResponses;
    }

    @Override
    public Boolean deleteCar(String id) {
        Car car = carRepository.findById(id).orElseThrow(() -> new RuntimeException("Id does not exist"));
        carRepository.delete(car);
        return true;
    }

    @Override
    public Page<CarResponse> showAllCar(int pageNumber, int pageSize) {

        int pageNo = pageNumber - 1;
        if (pageNo < 0)
            pageNo = 0;

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("carNumber").ascending());

        Page<Car> cars = carRepository.findAll(pageable);

        return cars.map(car -> {
            List<Trip> trips = tripRepository.findByCars(car);
            List<String> tripIds = new ArrayList<>();
            for (Trip itemTrip : trips) {
                tripIds.add(itemTrip.getTripId());
            }

            if (Objects.nonNull(trips)) {
                return new CarResponse(car, tripIds);
            }
            return new CarResponse(car, null);
        });

    }

    @Override
    public CarResponse showCarNumber(int carNumber) {

        Car cars = carRepository.findAllByCarNumber(carNumber);

        List<Trip> trips = tripRepository.findByCars(cars);
        List<String> tripIds = new ArrayList<>();
        for (Trip itemTrip : trips) {
            tripIds.add(itemTrip.getTripId());
        }

        return new CarResponse(cars, tripIds);
    }

    public List<ChairResponse> setupChairResponse(Car car) {

        List<Chair> chair = chairRepository.findAllByCar(car);

        List<ChairResponse> listChairResponse = new ArrayList<>();

        for (Chair item : chair) {
            ChairResponse chairResponse = new ChairResponse();
            chairResponse.setStatus(item.getStatus());
            chairResponse.setCarId(item.getCar().getCarId());
            chairResponse.setChairNumber(item.getChairNumber());
            chairResponse.setChairId(item.getChairId());
            listChairResponse.add(chairResponse);
        }
        return listChairResponse;
    }

}
