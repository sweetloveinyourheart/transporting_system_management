import './css/SelectSeatPage.css'
import bookedchair from '../../assets/images/chair/BookedChair.png'
import selectedchair from '../../assets/images/chair/SelectedChair.png'
import availablechair from '../../assets/images/chair/AvailableChair.png'
import Seat from '../../components/Seat/Seat'
import { useEffect, useState } from 'react'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAuth } from '../../contexts/auth'
import { submitOrder } from '../../services/order'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function SelectSeat({ trip, car }) {
    const [order, setOrder] = useState(null)

    const [seats, setSeats] = useState(car.chair)
    const [disabledSeats, setDisabledSeats] = useState([])

    const [stompClient, setStompClient] = useState(null);
    const { accessToken } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        const socket = new SockJS('http://localhost:9999/chair-booking');

        const stompClient = Stomp.over(socket);
        stompClient.debug = null
        stompClient.connect({
            Authorization: `Bearer ${accessToken}`
        }, () => {
            console.log('connected to WebSocket');
            setStompClient(stompClient)
        });

        const disconnect = () => {
            stompClient.disconnect(() => {
                console.log('disconnected from WebSocket');
            });
        }

        return () => {
            disconnect();
        }
    }, []);

    useEffect(() => {
        if (stompClient) {
            const disabledChairSubscription = stompClient.subscribe("/topic/disableSeat", function (message) {
                var disabledChair = JSON.parse(message.body);

                disabledChairSubscriptionHandler(disabledChair)
            });

            return () => {
                disabledChairSubscription.unsubscribe();
            }
        }
    }, [stompClient]);

    useEffect(() => {
        if (stompClient) {
            const orderSubscription = stompClient.subscribe('/topic/chair', function (message) {
                const newOrder = JSON.parse(message.body);
                orderSubscriptionHandler(newOrder, order)
            });
            return () => {
                orderSubscription.unsubscribe();
            }
        }
    }, [stompClient]);

    useEffect(() => {
        if (stompClient) {
            const chairsSubscription = stompClient.subscribe('/topic/chairs', function (message) {
                const chairUpdates = JSON.parse(message.body);
                setSeats(chairUpdates)
            });

            return () => {
                chairsSubscription.unsubscribe();
            }
        }
    }, [stompClient])

    useEffect(() => {
        if (stompClient) {
            const cancelSubscription = stompClient.subscribe('/topic/cancel', function (message) {
                const orderHasCancelRequest = message.body;
                
                setDisabledSeats(prevS => {
                    let list = [...prevS]
                    const updatedList = list.filter(item => item.orderId !== orderHasCancelRequest);
                    return updatedList
                })
            });

            return () => {
                cancelSubscription.unsubscribe();
            }
        }
    }, [stompClient])

    useEffect(() => {
        if (order && order.orderId.length > 0) {
            localStorage.setItem(
                order.orderId,
                JSON.stringify({ ...order, expireAt: new Date(new Date().getTime() + 5 * 60000) })
            );

            const clearLocalStorageItem = () => {
                const item = JSON.parse(localStorage.getItem(order.orderId))

                const data = JSON.stringify({
                    orderId: item.orderId,
                    tripId: trip.tripId
                })

                stompClient.send('/app/chairCancel', {}, data)

                localStorage.removeItem(order.orderId);
                setOrder(null)
            };

            const timeoutId = setTimeout(clearLocalStorageItem, 5 * 60000);

            // Clear the timeout when the component unmounts or the `order` prop changes.
            return () => clearTimeout(timeoutId);
        }
    }, [order]);

    const disabledChairSubscriptionHandler = (disabledChair) => {
        setDisabledSeats(prevS => {
            let chairList = [...prevS]
            const index = chairList.findIndex(item => item.orderId === disabledChair.orderId);

            if (index === -1) {
                chairList.push(disabledChair)
                return chairList
            } else {
                // update
                chairList[index].chairId = disabledChair.chairId
                return chairList
            }
        })
    }

    const orderSubscriptionHandler = (newOrder) => {
        setOrder(prevS => {
            if (prevS?.orderId === "" || prevS?.orderId === newOrder?.orderId) {
                return newOrder
            } else {
                return prevS
            }
        })
    }

    const onChooseSeat = async (chair) => {
        // setSelectedSeat(chair)

        if (chair) {
            // console.log(order?.orderId);
            const orderData = {
                orderId: order ? order.orderId : "",
                tripId: trip.tripId,
                chairId: chair.chairId,
                addressStart: trip.provinceStart,
                addressEnd: trip.provinceEnd
            }

            setOrder(orderData)

            stompClient.send(
                '/app/chair',
                { Authorization: `Bearer ${accessToken}` },
                JSON.stringify(orderData))
        }
    }

    const onSubmitOrder = async () => {
        if(!order || !order?.orderId) {
            message.error("Please pick a car before submit order !")
            return;
        }

        const data = await submitOrder({ orderId: order.orderId, tripId: trip.tripId })

        if(!data) {
            message.error("Oops! Something went wrong @@")
            return;
        }

        message.success("Create order successfully !")
        navigate("/booking-details")
    }

    return (
        <div class="select-seat-page">
            <div>
                <p class="select-seat-page__title">Select The Seats</p>
            </div>
            <div class="seat-info">
                <div class="seat-info__img">
                    <img src={selectedchair} alt="" />
                    <img src={availablechair} alt="" />
                    <img src={bookedchair} alt="" />
                </div>
            </div>
            <div class="seat-map">
                <div className='seat-map__desk-title'>
                    <p>Upper Desk</p>
                    <p>Lower Desk</p>
                </div>
                <div class="seat-map__position">
                    <div>
                        {seats.slice(0, 7).map((chair) => (
                            <Seat
                                chair={chair}
                                key={chair.chairId}
                                isSelected={order?.chairId === chair.chairId}
                                isSelecting={disabledSeats.some(el => el.chairId === chair.chairId)}
                                onSelectSeat={onChooseSeat}
                            />
                        ))}
                    </div>
                    <div>
                        <Seat
                            chair={seats[7]}
                            isSelected={(order && (order?.chairId === seats[7]?.chairId))}
                            isSelecting={disabledSeats.some(el => el.chairId === seats[7]?.chairId)}
                            onSelectSeat={onChooseSeat}
                        />
                    </div>
                    <div>
                        {seats.slice(8, 15).map((chair) => (
                            <Seat
                                chair={chair}
                                key={chair.chairId}
                                isSelected={order?.chairId === chair.chairId}
                                isSelecting={disabledSeats.some(el => el.chairId === chair.chairId)}
                                onSelectSeat={onChooseSeat}
                            />
                        ))}
                    </div>
                    <div style={{
                        fontSize: "100px",
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 100,
                        color: '#5669FF'
                    }}>|</div>
                    <div>
                        {seats.slice(15, 22).map((chair) => (
                            <Seat
                                chair={chair}
                                key={chair.chairId}
                                isSelected={order?.chairId === chair.chairId}
                                isSelecting={disabledSeats.some(el => el.chairId === chair.chairId)}
                                onSelectSeat={onChooseSeat}
                            />
                        ))}
                    </div>
                    <div>
                        <Seat
                            chair={seats[22]}
                            isSelected={order && (order?.chairId === seats[22]?.chairId)}
                            isSelecting={disabledSeats.some(el => el.chairId === seats[22]?.chairId)}
                            onSelectSeat={onChooseSeat}
                        />
                    </div>
                    <div>
                        {seats.slice(23, 30).map((chair) => (
                            <Seat
                                chair={chair}
                                key={chair.chairId}
                                isSelected={order?.chairId === chair.chairId}
                                isSelecting={disabledSeats.some(el => el.chairId === chair.chairId)}
                                onSelectSeat={onChooseSeat}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <p >Seats: {seats.length}</p>
                </div>
                <div>
                    <button className="btn-choose" onClick={() => onSubmitOrder()}>Continue</button>
                </div>
            </div>
        </div>
    )
} 