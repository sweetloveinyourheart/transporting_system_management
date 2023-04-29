package com.busstation.payload.request;

import lombok.Data;

import java.util.List;

@Data
public class OrderDetailRequest {

    private String orderId;

    private String tripId;

    private List<String> chairId;

    private String updateChairId;

    private Boolean status;


    private String addressStart;

    private String addressEnd;

    public Boolean getStatus() {
        return status;
    }

    public Boolean setStatus(Boolean status){
        return this.status = status;
    }
}
