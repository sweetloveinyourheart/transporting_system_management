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
	}, [])


	const myBooking = [];

	for (let i = 0; i < order.length; i++) {
		myBooking.push({
			key: i.toString(),
			departure: order[i].ticket.addressStart,
			destination: order[i].ticket.addressEnd,
			time: order[i].ticket.time,
			state: order[i].ticket.state,
			price: order[i].ticket.price,
		});
	}

	return (
		<div className='my-booking'>
			<div className='title-all-booking'>
				<Typography.Title className='title'>My Bookings</Typography.Title>
				{/* <div className='all-booking'>
					<Select
						defaultValue="All Booking"
						style={{ width: 120 }}
						onChange={handleChange}
						options={[
							{ value: 'jack', label: 'All Booking' },
							{ value: 'lucy', label: 'Lucy' },
							{ value: 'Yiminghe', label: 'yiminghe' },
							{ value: 'disabled', label: 'Disabled' },
						]}
					/>
				</div> */}
			</div>
			<div className='booking-items'>
				{
					myBooking.map((detail, index) => (
						<div key={index} className='item'>
							<div className='place'>
								<div className='departure'>
									{detail.departure}
								</div>
								<div className='arrow'>
									<FontAwesomeIcon icon={faArrowRightLong} style={{ fontSize: "1.5em", color: "#165F81" }} />
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
								<div className='state'>
									{detail.state}
								</div>
								<div className='price'>
									{detail.price}đ
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