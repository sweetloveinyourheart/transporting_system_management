package com.busstation.services;


import com.busstation.payload.request.SearchTripRequest;
import com.busstation.payload.request.TripRequest;
import com.busstation.payload.response.SearchTripResponse;
import com.busstation.payload.response.TripResponse;
import com.busstation.payload.response.UserByTripIdResponse;
import org.springframework.data.domain.Page;

public interface TripService {
    TripResponse createTrip(TripRequest tripRequest);

    TripResponse updateTrip(String id, TripRequest newTripRequest);

    Boolean deleteTrip(String id);

    Page<SearchTripResponse> getAllTripsByProvinceStartAndProvinceEndDateTime(SearchTripRequest searchTripRequest, int pageNo, int pageSize);

    Page<TripResponse> getAllTrips(int pageNo, int pageSize);

    Page<UserByTripIdResponse> getAllUserByTrip(String tripId, int pageNo, int pageSize);

}
