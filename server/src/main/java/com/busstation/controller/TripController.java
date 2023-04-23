package com.busstation.controller;

import com.busstation.payload.request.SearchTripRequest;
import com.busstation.payload.request.TripRequest;
import com.busstation.payload.response.SearchTripResponse;
import com.busstation.payload.response.TripResponse;
import com.busstation.payload.response.UserByTripIdResponse;
import com.busstation.services.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController(value = "tripAPIofWeb")
@RequestMapping(value = "/api/v1/trips")
public class TripController {


    @Autowired
    private TripService tripService;

    @PostMapping("/search")
    public ResponseEntity<?> getAllTripsByProvinceStartAndProvinceEndDateTime(
            @RequestBody SearchTripRequest searchTripRequest,
            @RequestParam(value = "pageNo", defaultValue = "0") int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {

        Page<SearchTripResponse> trips = tripService.getAllTripsByProvinceStartAndProvinceEndDateTime(searchTripRequest, pageNo, pageSize);
        if(trips == null){
            return new ResponseEntity<>("Temporarily no trips", HttpStatus.OK);
        }
        return new ResponseEntity<>(trips, HttpStatus.OK);
    }

    @GetMapping("/{trip_id}")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYEE','ROLE_ADMIN')")
    public ResponseEntity<?> getUsersByTrips(@RequestParam(value = "pageNo", defaultValue = "0") int pageNo,
                                             @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
                                             @PathVariable("trip_id") String tripId) {

        Page<UserByTripIdResponse> userByTripIdResponsePage = tripService.getAllUserByTrip(tripId, pageNo, pageSize);
        if(userByTripIdResponsePage == null){
            return new ResponseEntity<>("Temporarily no users on this trip", HttpStatus.OK);
        }
        return new ResponseEntity<>(userByTripIdResponsePage, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllTrips(@RequestParam(value = "pageNo", defaultValue = "0") int pageNo,
                                         @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {

        Page<TripResponse> tripResponsePage = tripService.getAllTrips(pageNo, pageSize);
        return new ResponseEntity<>(tripResponsePage, HttpStatus.OK);
    }

    @PostMapping()
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createTrip(@RequestBody TripRequest tripRequest) {

        TripResponse tripResponse = tripService.createTrip(tripRequest);
        if(tripResponse == null){
            return new ResponseEntity<>("trip or ticket already exists", HttpStatus.OK);
        }
        return new ResponseEntity<>(tripResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateTrip(@RequestBody TripRequest tripRequest,
                                        @PathVariable("id") String id) {

        TripResponse trip = tripService.updateTrip(id, tripRequest);

        if(trip == null){
            return new ResponseEntity<>("trip or ticket already exists", HttpStatus.OK);
        }
        return new ResponseEntity<>(trip, HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteTrip(@PathVariable("id") String id) {

        if (tripService.deleteTrip(id)) {
            return new ResponseEntity<>("delete Success!", HttpStatus.OK);
        }
        return new ResponseEntity<>("delete failed!!", HttpStatus.OK);
    }
}
