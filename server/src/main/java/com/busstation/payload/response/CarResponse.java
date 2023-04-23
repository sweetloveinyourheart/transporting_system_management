package com.busstation.payload.response;

import com.busstation.entities.Car;
import com.busstation.entities.Chair;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CarResponse {
    private String carId;
    private Boolean status;
    private int carNumber;
    private List<ChairResponse> chair;
    private List<String> tripId;


    public CarResponse(Car car, List<String> tripId){
        this.carId = car.getCarId();
        this.tripId = tripId;
        this.status = car.getStatus();
        this.carNumber = car.getCarNumber();


        List<ChairResponse> chairResponseList = new ArrayList<>();

        for (Chair chair : car.getChairs()){
            ChairResponse chairRes = new ChairResponse();
            chairRes.setChairId(chair.getChairId());
            chairRes.setCarId(chair.getCar().getCarId());
            chairRes.setChairNumber(chair.getChairNumber());
            chairRes.setStatus(chair.getStatus());

            chairResponseList.add(chairRes);
        }
        this.chair = chairResponseList;
    }
}