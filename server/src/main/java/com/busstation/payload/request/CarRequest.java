package com.busstation.payload.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarRequest {
    private Boolean status;
    private int carNumber;
    private int numberOfChair;
    private String tripId;
}
