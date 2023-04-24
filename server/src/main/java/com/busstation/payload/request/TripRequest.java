package com.busstation.payload.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class TripRequest {

    private String provinceStart;

    private String provinceEnd;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timeStart;

    private Date updateAt;

    private BigDecimal price;

    private String pickupLocation;

    private String dropOffLocation ;

}