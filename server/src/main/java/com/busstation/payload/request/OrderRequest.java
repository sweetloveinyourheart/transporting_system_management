package com.busstation.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class OrderRequest {
    private String orderId;

    private String tripId;

    private String chairId;

    private String addressStart;

    private String addressEnd;

}
