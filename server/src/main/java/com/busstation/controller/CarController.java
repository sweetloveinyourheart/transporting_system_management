package com.busstation.controller;


import com.busstation.payload.request.CarRequest;
import com.busstation.payload.request.addCarRequest;
import com.busstation.payload.response.ApiResponse;
import com.busstation.payload.response.CarResponse;
import com.busstation.repositories.CarRepository;
import com.busstation.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController(value = "carAPIofWeb")
@RequestMapping("/api/v1/cars")
public class CarController {
    @Autowired
    private CarService carService;

    @Autowired
    private CarRepository carRepository;

    @GetMapping("/{carNumber}")
    public ResponseEntity<?> searchCarByCarNumber(
            @PathVariable("carNumber") int carNumber
    ) {
        return new ResponseEntity<>(carService.showCarNumber(carNumber), HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity<?> getAllCar(
            @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "2") int pageSize) {

        return new ResponseEntity<>(carService.showAllCar(pageNumber, pageSize), HttpStatus.OK);

    }

    @PostMapping("/addDriverForCar")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addDriverForCar(@RequestBody addCarRequest request) {
        ApiResponse apiResponse = carService.addDriverForCar(request.getEmployeeId(), request.getCarId());
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PostMapping("/addTripForCar")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addTripForCar(@RequestBody addCarRequest request) {
        ApiResponse apiResponse = carService.addTripForCar(request.getTripId(), request.getCarId());
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addCar(@RequestBody CarRequest request) {
        CarResponse carResponse = carService.addCar(request);
        return new ResponseEntity<>(carResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateCar(@RequestBody CarRequest request, @PathVariable("id") String carId) {
        CarResponse car = carService.updatedCar(carId, request);
        return new ResponseEntity<>(car, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteCar(@PathVariable("id") String id) {
        if (carService.deleteCar(id)) {
            return new ResponseEntity<>("Deleted Successfully", HttpStatus.OK);
        }

        return new ResponseEntity<>("Delete failed", HttpStatus.BAD_REQUEST);
    }

}
