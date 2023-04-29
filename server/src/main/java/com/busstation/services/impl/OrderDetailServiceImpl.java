package com.busstation.services.impl;

import com.busstation.entities.*;
import com.busstation.exception.DataNotFoundException;
import com.busstation.payload.request.OrderDetailRequest;
import com.busstation.payload.response.*;
import com.busstation.repositories.*;
import com.busstation.services.OrderDetailService;
import com.busstation.utils.GetUserUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ChairRepository chairRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private TripUserRepository tripUserRepository;


    @Override
    public OrderDetailResponse updateOrderDetail(String orderDetailId, OrderDetailRequest orderDetailRequest) {

        OrderDetail orderDetail = orderDetailRepository.findById(orderDetailId).orElseThrow(() -> new EntityNotFoundException("Order Detail does not exist"));

        Chair chair = chairRepository.findById(orderDetailRequest.getUpdateChairId()).orElseThrow(() -> new EntityNotFoundException("chair does not exist"));

        Order order = orderRepository.findById(orderDetail.getOrder().getOrderID()).orElseThrow(() -> new EntityNotFoundException("Order does not exist"));

        Optional<Ticket> ticket = ticketRepository.findByAddressStartAndAddressEnd(orderDetailRequest.getAddressStart(), orderDetailRequest.getAddressEnd());

        if (!ticket.isPresent()) {
            throw new DataNotFoundException("Ticket not found");
        }

        orderDetail.setStatus(orderDetailRequest.getStatus());
        orderDetail.setChair(chair);
        orderDetail.setOrder(order);
        orderDetail.setTicket(ticket.get());
        orderDetail.setUpdatedAt(new Date());

        OrderDetail updateOrderDetail = orderDetailRepository.save(orderDetail);

        if(updateOrderDetail.getStatus() == false){
            deleteUserToTrip(updateOrderDetail, orderDetailRequest.getTripId());
        }else {
            TripUser tripUser = tripUserRepository.findTripUserByUserId(orderDetail.getOrder().getUser().getUserId());
            if(Objects.isNull(tripUser)){
                addUserToTrip(orderDetailRequest.getTripId(),orderDetail.getOrder().getUser().getUserId());
            }
        }

        OrderDetailResponse orderDetailResponse = new OrderDetailResponse();
        orderDetailResponse.setOrderDetailId(orderDetail.getOrderDetailId());
        orderDetailResponse.setStatus(orderDetail.getStatus());
        orderDetailResponse.setChair(setupChairResponse(chair));
        orderDetailResponse.setOrder(setupOrderResponse(order));
        orderDetailResponse.setTicket(setupTicketResponse(ticket.get()));


        return orderDetailResponse;
    }

    @Override
    public Page<OrderDetailResponse> getAllOrderDetail(int pageNo, int pageSize) {

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("createAt").descending());

        Page<OrderDetail> orderDetails = orderDetailRepository.findAll(pageable);

        Page<OrderDetailResponse> orderDetailPage = orderDetails.map(OrderDetailResponse::new);

        return orderDetailPage;
    }

    @Override
    public Page<OrderDetailResponse> getAllOrderDetailByUser(int pageNo, int pageSize) {

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("createAt").descending());

        Account account = accountRepository.findByusername(new GetUserUtil().GetUserName());

        Page<OrderDetail> orderDetails = orderDetailRepository.findAllByUserId(account.getUser().getUserId(), pageable);

        Page<OrderDetailResponse> orderDetailPage = orderDetails.map(OrderDetailResponse::new);

        return orderDetailPage;
    }

    public UserResponse setupUserResponse(Order order) {
        User user = userRepository.findById(order.getUser().getUserId()).orElseThrow(() -> new EntityNotFoundException("User does not exist"));

        UserResponse userResponse = new UserResponse();
        userResponse.setUserId(user.getUserId());
        userResponse.setStatus(user.getStatus());
        userResponse.setFullName(user.getFullName());
        userResponse.setPhoneNumber(user.getPhoneNumber());
        userResponse.setEmail(user.getEmail());
        userResponse.setAddress(user.getAddress());

        return userResponse;
    }

    public ChairResponse setupChairResponse(Chair chair) {

        ChairResponse chairResponse = new ChairResponse();
        chairResponse.setChairId(chair.getChairId());
        chairResponse.setChairNumber(chair.getChairNumber());
        chairResponse.setCarId(chair.getCar().getCarId());

        return chairResponse;
    }

    public OrderResponse setupOrderResponse(Order order) {

        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setOrderId(order.getOrderID());
        orderResponse.setUser(setupUserResponse(order));

        return orderResponse;
    }

    public TicketResponse setupTicketResponse(Ticket ticket) {

        TicketResponse ticketResponse = new TicketResponse();
        ticketResponse.setTicketId(ticket.getTicketId());
        ticketResponse.setAddressStart(ticket.getAddressStart());
        ticketResponse.setAddressEnd(ticket.getAddressEnd());
        ticketResponse.setPrice(ticket.getPrice());
        ticket.setPickupLocation(ticket.getPickupLocation());
        ticket.setDropOffLocation(ticket.getDropOffLocation());

        return ticketResponse;
    }

    public void addUserToTrip(String tripId, String userId) {
        Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new EntityNotFoundException("Trip not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        trip.getUsers().add(user);
        tripRepository.save(trip);
    }

    public void deleteUserToTrip(OrderDetail orderDetail, String tripId) {

        User user = userRepository.findUserByOrders(orderDetail.getOrder());

        if(Objects.nonNull(user)){
            Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new EntityNotFoundException("Trip not found"));

            trip.getUsers().remove(user);
            tripRepository.save(trip);
        }
    }
}
