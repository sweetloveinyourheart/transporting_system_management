package com.busstation.payload.response;

import com.busstation.entities.Chair;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChairResponse {

    private String chairId;

    private int chairNumber;

    private Boolean status;

    private String carId;

    private  Boolean chairExistInOrderDetail;

    public ChairResponse(Chair chair) {
        this.chairId = chair.getChairId();
        this.chairNumber = chair.getChairNumber();
        this.status = chair.getStatus();
        this.carId = chair.getCar().getCarId();
    }
}
