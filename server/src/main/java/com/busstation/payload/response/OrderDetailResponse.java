package com.busstation.payload.response;

import com.busstation.entities.OrderDetail;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderDetailResponse {

    private String orderDetailId;

    private Boolean status;

    private OrderResponse order;

    private ChairResponse chair;

    private TicketResponse ticket;

    public Boolean getStatus() {
        return status;
    }

    public Boolean setStatus(Boolean status){
        return this.status = status;
    }

    public OrderDetailResponse(OrderDetail orderDetail){

        this.orderDetailId = orderDetail.getOrderDetailId();
        this.status = orderDetail.getStatus();

        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setOrderId(orderDetail.getOrder().getOrderID());

        TripResponse tripResponse = new TripResponse();
        tripResponse.setTripId(orderDetail.getOrder().getTrip().getTripId());
        tripResponse.setTimeStart(orderDetail.getOrder().getTrip().getTimeStart());

        orderResponse.setTrip(tripResponse);

        UserResponse userResponse = new UserResponse();
        userResponse.setUserId(orderDetail.getOrder().getUser().getUserId());
        userResponse.setFullName(orderDetail.getOrder().getUser().getFullName());
        userResponse.setPhoneNumber(orderDetail.getOrder().getUser().getPhoneNumber());
        userResponse.setEmail(orderDetail.getOrder().getUser().getEmail());
        userResponse.setAddress(orderDetail.getOrder().getUser().getAddress());
        userResponse.setStatus(orderDetail.getOrder().getUser().getStatus());

        orderResponse.setUser(userResponse);

        this.order = orderResponse;

        ChairResponse chairResponse = new ChairResponse();
        chairResponse.setChairId(orderDetail.getChair().getChairId());
        chairResponse.setCarId(orderDetail.getChair().getCar().getCarId());
        chairResponse.setChairNumber(orderDetail.getChair().getChairNumber());
        chairResponse.setStatus(orderDetail.getChair().getStatus());

        this.chair = chairResponse;

        TicketResponse ticketResponse = new TicketResponse();
        ticketResponse.setTicketId(orderDetail.getTicket().getTicketId());
        ticketResponse.setAddressStart(orderDetail.getTicket().getAddressStart());
        ticketResponse.setAddressEnd(orderDetail.getTicket().getAddressEnd());
        ticketResponse.setPrice(orderDetail.getTicket().getPrice());

        this.ticket = ticketResponse;
    }
}
