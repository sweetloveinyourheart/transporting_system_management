package com.busstation.services;

import com.busstation.payload.request.OrderDetailRequest;
import com.busstation.payload.response.OrderDetailResponse;
import org.springframework.data.domain.Page;

public interface OrderDetailService {

    OrderDetailResponse updateOrderDetail(String orderDetailId, OrderDetailRequest orderDetailRequest);

    Page<OrderDetailResponse> getAllOrderDetail(int pageNo, int pageSize);

    Page<OrderDetailResponse> getAllOrderDetailByUser(int pageNo, int pageSize);

}
