package com.busstation.services.impl;

import com.busstation.entities.*;
import com.busstation.exception.DataNotFoundException;
import com.busstation.payload.request.OrderRequest;
import com.busstation.payload.response.*;
import com.busstation.repositories.*;
import com.busstation.services.OrderService;
import com.busstation.utils.GetUserUtil;
import com.busstation.utils.JwtProviderUtils;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ChairRepository chairRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private ProvinceRepository provinceRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtProviderUtils jwtProviderUtils;


    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest orderRequest,String token) {

        User user = getUserOfSocket(token);

        Optional<Ticket> ticket = ticketRepository.findByAddressStartAndAddressEnd(orderRequest.getAddressStart(), orderRequest.getAddressEnd());

        if(!ticket.isPresent()){
            throw new DataNotFoundException("Ticket not found");
        }

        Order newOrder;
        if(orderRequest.getOrderId().equalsIgnoreCase("")){

            Trip trip = tripRepository.findById(orderRequest.getTripId()).orElseThrow(()-> new DataNotFoundException("Trip not found"));

            Order order = new Order();
            order.setUser(user);
            order.setOrderID(getOrderId(orderRequest.getTripId()));
            order.setTrip(trip);
            newOrder = orderRepository.save(order);
        }
        else {
            newOrder = orderRepository.findById(orderRequest.getOrderId()).orElseThrow(()-> new DataNotFoundException("Order not found"));
        }
        OrderDetail orderDetail = createOrderDetail(orderRequest, newOrder, ticket.get());

        OrderResponse orderResponse=new OrderResponse();
        orderResponse.setOrderId(newOrder.getOrderID());
        orderResponse.setChairId(orderDetail.getChair().getChairId());
        orderResponse.setTripId(newOrder.getTrip().getTripId());
        return orderResponse;
    }

    @Override
    @Transactional
    public Boolean submitOrder(String orderId, String tripId) {

        List<OrderDetail> orderDetails = orderDetailRepository.findByOrder_OrderID(orderId);
        User user = getUser();

        if(Objects.nonNull(orderDetails)){
            for(OrderDetail orderDetail : orderDetails){
                orderDetail.setStatus(true);
                orderDetailRepository.save(orderDetail);
            }
            addUserToTrip(tripId,user.getUserId());
            return true;
        }
        return false;
    }


    @Override
    public Page<OrderDetailResponse> searchOrderById(String orderId, int pageNo, int pageSize) {

        User user = getUser();
        Optional<Order> orderCheck = orderRepository.findById(orderId);


        if(user.getUserId().equals(orderCheck.get().getUser().getUserId())){

            int pageNumber = pageNo - 1;

            if(pageNumber < 0)
                pageNumber = 0;

            Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createAt").descending());

            Page<OrderDetail> orderDetails = orderDetailRepository.findByOrder_OrderID(orderId,pageable);

            List<OrderDetailResponse> orderDetailResponses = new ArrayList<>();

            Order order = orderCheck.get();

            for(OrderDetail orderDetail : orderDetails) {

                Chair chair = chairRepository.findById(orderDetail.getChair().getChairId()).orElseThrow(() -> new EntityNotFoundException("chair does not exist"));

                Ticket ticket = ticketRepository.findById(orderDetail.getTicket().getTicketId()).orElseThrow(() -> new EntityNotFoundException("Ticker does not exist"));

                OrderDetailResponse orderDetailResponse = new OrderDetailResponse();

                orderDetailResponse.setOrderDetailId(orderDetail.getOrderDetailId());
                orderDetailResponse.setStatus(orderDetail.getStatus());
                orderDetailResponse.setOrder(setupOrderResponse(order));
                orderDetailResponse.setTicket(setupTicketResponse(ticket));
                orderDetailResponse.setChair(setupChairResponse(chair));

                orderDetailResponses.add(orderDetailResponse);
            }

            Page<OrderDetailResponse> orderDetailResponsePage = new PageImpl<>(orderDetailResponses, pageable, orderDetails.getTotalElements());

            return orderDetailResponsePage;
        }

        return null;
    }

    @Override
    public Boolean deleteOrder(String orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(()-> new DataNotFoundException("Order not found"));
        orderRepository.delete(order);
        return true;
    }

    public User getUser(){
        Account account = accountRepository.findByusername(new GetUserUtil().GetUserName());
        User user = userRepository.findById(account.getUser().getUserId()).orElseThrow(()->new RuntimeException("User does not exist"));
        return user;
    }
    public User getUserOfSocket(String token){
        String username = jwtProviderUtils.getUserNameFromJwtToken(token);
        Account account = accountRepository.findByusername(username);
        User user = userRepository.findById(account.getUser().getUserId()).orElseThrow(()->new RuntimeException("User does not exist"));
        return user;
    }
    public String getOrderId(String tripId){

        final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        final int LENGTH = 15;

        Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new EntityNotFoundException("Trip not found"));

        String provinceEnd = Arrays.stream(trip.getProvinceEnd().split(" "))
                .map(s->s.charAt(0))
                .collect(StringBuilder::new,
                        StringBuilder::append,
                        StringBuilder::append).toString();
        Province province = provinceRepository.findByName(trip.getProvinceEnd());
        if(Objects.isNull(province)){
            Location location = locationRepository.findByName(trip.getProvinceEnd());
            provinceEnd += location.getLocationId() + "-";
        }
        else{

            provinceEnd += province.getProvinceId() + "-";
        }

        boolean doWhile = true;
        String initial;

        do{
            initial = provinceEnd;
            Random random = new Random();
            StringBuilder builder = new StringBuilder();

            int length = LENGTH - provinceEnd.length();

            for(int i=0; i<length; i++){

                int index = random.nextInt(CHARACTERS.length());
                builder.append(CHARACTERS.charAt(index));
            }
            initial += builder;

            if(!orderRepository.findById(initial).isPresent()){
                doWhile = false;
            }

        }while (doWhile);

        return initial;
    }

    public OrderDetail createOrderDetail(OrderRequest orderRequest, Order newOrder, Ticket ticket){

            Chair chair = chairRepository.findById(orderRequest.getChairId()).orElseThrow(()->new EntityNotFoundException("chair does not exist"));

            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setStatus(false);
            orderDetail.setChair(chair);
            orderDetail.setOrder(newOrder);
            orderDetail.setTicket(ticket);

            OrderDetail newOrderDetail = orderDetailRepository.save(orderDetail);
            return  newOrderDetail;
    }

    public void addUserToTrip(String tripId, String userId) {
        Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new EntityNotFoundException("Trip not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        trip.getUsers().add(user);
        tripRepository.save(trip);
    }

    public UserResponse setupUserResponse(Order order){
        User user = userRepository.findById(order.getUser().getUserId()).orElseThrow(()->new EntityNotFoundException("User does not exist"));

        UserResponse userResponse = new UserResponse();
        userResponse.setUserId(user.getUserId());
        userResponse.setStatus(user.getStatus());
        userResponse.setFullName(user.getFullName());
        userResponse.setPhoneNumber(user.getPhoneNumber());
        userResponse.setEmail(user.getEmail());
        userResponse.setAddress(user.getAddress());

        return userResponse;
    }

    public ChairResponse setupChairResponse(Chair chair){

        ChairResponse chairResponse = new ChairResponse();
        chairResponse.setChairId(chair.getChairId());
        chairResponse.setChairNumber(chair.getChairNumber());
        chairResponse.setStatus(chair.getStatus());
        chairResponse.setCarId(chair.getCar().getCarId());

        return chairResponse;
    }

    public OrderResponse  setupOrderResponse(Order order){

        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setOrderId(order.getOrderID());
        orderResponse.setUser(setupUserResponse(order));
        orderResponse.setTripId(order.getTrip().getTripId());

        return orderResponse;
    }

    public TicketResponse setupTicketResponse(Ticket ticket){

        TicketResponse ticketResponse = new TicketResponse();
        ticketResponse.setTicketId(ticket.getTicketId());
        ticketResponse.setAddressStart(ticket.getAddressStart());
        ticketResponse.setAddressEnd(ticket.getAddressEnd());
        ticketResponse.setPrice(ticket.getPrice());
        ticket.setPickupLocation(ticket.getPickupLocation());
        ticket.setDropOffLocation(ticket.getDropOffLocation());

        return ticketResponse;
    }
}
