package com.busstation.payload.response;

import com.busstation.entities.Trip;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TripResponse {

    private String tripId;

    private String provinceStart;

    private String provinceEnd;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timeStart;

    private BigDecimal price;

    private Boolean status;

    private String pickupLocation;

    private String dropOffLocation;

    public TripResponse(Trip trip, BigDecimal price, String pickupLocation, String dropOffLocation){

        this.tripId = trip.getTripId();
        this.provinceStart = trip.getProvinceStart();
        this.provinceEnd = trip.getProvinceEnd();
        this.timeStart = trip.getTimeStart();
        this.price = price;
        this.status = trip.getStatus();
        this.pickupLocation = pickupLocation;
        this.dropOffLocation = dropOffLocation;
    }
}
