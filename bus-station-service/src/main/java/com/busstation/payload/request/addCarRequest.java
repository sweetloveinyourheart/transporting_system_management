package com.busstation.payload.request;

import lombok.Data;

@Data
public class addCarRequest {

    private String carId;
    private String tripId;
    private String employeeId;
}
