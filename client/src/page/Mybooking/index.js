import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Select, Divider, Typography, } from 'antd';
import './style.css';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/auth';
import { getOderByUser } from '../../services/mybooking';


function Mybooking() {
	const [order, setOrder] = useState([]);
	const { accessToken } = useAuth();
	// console.log(order);
	useEffect(() => {
		getOderByUser(accessToken).then(res => {
			setOrder(res.content)
			// console.log(accessToken);
		})
	}, [accessToken])

	const myBooking = order.map((item, index) => ({
		key: index.toString(),
		departure: item.ticket.addressStart,
		destination: item.ticket.addressEnd,
		time: item.order.trip.timeStart,
		state: item.status,
		price: item.ticket.price,
	}));

	return (
		<div className='my-booking'>
			<div className='title-all-booking'>
				<Typography.Title className='title'>My Bookings</Typography.Title>
			</div>
			<div className='booking-items'>
				{
					myBooking.map((detail, index) => (
						<div key={index} className='item'>
							<div className='place'>
								<div className='departure'>
									{detail.departure}
								</div>
								{/* <div className='arrow'>
									<FontAwesomeIcon icon={faArrowRightLong}  style={{ fontSize: "1.5em", color: "#165F81" }} />
								</div> */}
								<div class="flex justify-center items-center w-1/2">
									<div class="arrow">
										<FontAwesomeIcon icon={faArrowRightLong} style={{ fontSize: "3em", color: "#165F81" }} />
									</div>
								</div>
								<div className='destination'>
									{detail.destination}
								</div>
							</div>
							<Divider style={{ padding: "0px 10px" }} />
							<div className='time-state-car'>
								<div className='time'>
									{detail.time}
								</div>
								{/* {detail.state === true ?
									<div style={{ background: "green" }} className='state'>
										Ongoing
									</div>
									:
									<div style={{ background: "red" }} className='state'>
										Cancel
									</div>
								} */}
								<div class="flex justify-center items-center  mr-24" >
									<div class="arrow">
										{detail.state === true ?
											<div style={{ background: "green" }} className='state'>
												Ongoing
											</div>

											:
											<div style={{ background: "red" }} className='state'>
												Cancel
											</div>
										}
									</div>
								</div>
								<div className='price'>
									{Intl.NumberFormat().format(detail.price)}đ
								</div>

							</div>
						</div>
					))
				}
			</div>


		</div>
	);
}

export default Mybooking;