package com.busstation.services;

import com.busstation.payload.request.OrderDetailRequest;
import com.busstation.payload.request.OrderRequest;
import com.busstation.payload.response.OrderDetailResponse;
import com.busstation.payload.response.OrderResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest orderRequest,String token);

    Boolean submitOrder(String orderId, String tripId);

    Page<OrderDetailResponse> searchOrderById(String orderId, int pageNo, int pageSize);

    Boolean deleteOrder(String orderId);
}
