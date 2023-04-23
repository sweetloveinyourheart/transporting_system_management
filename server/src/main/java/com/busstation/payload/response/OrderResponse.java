package com.busstation.payload.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderResponse {

    private String orderId;

    private String tripId;

    private TripResponse trip;

    private String chairId;

    private UserResponse user;

    private List<OrderDetailResponse> orderDetail;
}
