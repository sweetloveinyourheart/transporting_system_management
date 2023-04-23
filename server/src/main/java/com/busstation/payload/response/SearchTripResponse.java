package com.busstation.payload.response;

import com.busstation.entities.Car;
import com.busstation.entities.Chair;
import com.busstation.entities.Trip;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchTripResponse {

    private String tripId;

    private String provinceStart;

    private String provinceEnd;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timeStart;

    private List<CarResponse> car;

    private BigDecimal price;

    public SearchTripResponse(Trip trip, BigDecimal price, List<String> chairExistInOrderDetails){

        this.tripId = trip.getTripId();
        this.provinceStart = trip.getProvinceStart();
        this.provinceEnd = trip.getProvinceEnd();
        this.timeStart = trip.getTimeStart();
        this.price = price;

        List<CarResponse> carResponseList = new ArrayList<>();


        for(Car item : trip.getCars()){

            List<ChairResponse> chairResponseList = new ArrayList<>();

            for (Chair chair : item.getChairs()){
                ChairResponse chairResponse = new ChairResponse();
                chairResponse.setChairId(chair.getChairId());
                chairResponse.setChairNumber(chair.getChairNumber());
                if(chairExistInOrderDetails.contains(chair.getChairId()))
                    chairResponse.setChairExistInOrderDetail(true);
                else
                    chairResponse.setChairExistInOrderDetail(false);

                chairResponseList.add(chairResponse);
            }

            CarResponse carResponse = new CarResponse();
            carResponse.setCarId(item.getCarId());
            carResponse.setCarNumber(item.getCarNumber());
            carResponse.setChair(chairResponseList);
            carResponse.setStatus(item.getStatus());
            carResponseList.add(carResponse);
        }

        this.car = carResponseList;
    }
}