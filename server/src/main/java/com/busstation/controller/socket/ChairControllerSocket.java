package com.busstation.controller.socket;

import com.busstation.dto.ChairDto;
import com.busstation.entities.Trip;
import com.busstation.payload.request.CancelOrderRequest;
import com.busstation.payload.request.OrderRequest;
import com.busstation.payload.response.ChairResponse;
import com.busstation.payload.response.OrderResponse;
import com.busstation.services.ChairService;
import com.busstation.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Arrays;
import java.util.List;

@Controller
public class ChairControllerSocket {
    @Autowired
    private ChairService chairService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chairs")
    @SendTo("/topic/chairs")
    public List<ChairResponse> handleChairsUpdate(@Payload String carId){
        return chairService.showAllChair(carId);
    }

    @MessageMapping("/chair")
    @SendTo("/topic/chair")
    public OrderResponse handleChairUpdate(@Payload OrderRequest orderRequest, StompHeaderAccessor headers) throws Exception {
        String bearerToken = headers.getFirstNativeHeader("Authorization");
        String jwtToken = bearerToken.substring(7);

        OrderResponse orderResponse=orderService.createOrder(orderRequest, jwtToken);
        simpMessagingTemplate.convertAndSend("/topic/disableSeat",orderResponse);
        return  orderResponse;
    }

    @MessageMapping("/chairCancel")
    @SendTo("/topic/cancel")
    public String handleChairUpdate(@Payload CancelOrderRequest cancelOrderRequest) throws Exception {
        Boolean orderResponse = orderService.deleteOrder(cancelOrderRequest.orderId);
        simpMessagingTemplate.convertAndSend("/topic/openCancel",cancelOrderRequest.tripId);
        return cancelOrderRequest.orderId;
    }
}

