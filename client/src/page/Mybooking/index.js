import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Select, Divider, Typography, } from 'antd';
import './style.css';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/auth';
import { getOderByUser } from '../../services/mybooking';
import BookingDetails from '../BookingDetails';


function Mybooking() {
	const [getDetail, setGetDetail] = useState();
	const [order, setOrder] = useState([]);
	const [openDetail, setOpenDetail] = useState();
	const { accessToken } = useAuth();

	useEffect(() => {
		getOderByUser(accessToken).then(res => {
			setOrder(res.content)
		})
	}, [accessToken])

	const onClickOrder = (value, index) => {
		setOpenDetail(index);
		setGetDetail(value);
		// console.log(getDetail)
		if (openDetail === index) {
			setGetDetail();
			setOpenDetail();
		}
	}

	return (
		<div className='my-booking'>
			<div className='booking-items'>
				{
					order.map((detail, index) => (
						<div key={index} className='item'>
							<div className='place'>
								<div className='departure'>
									{detail.ticket.addressStart}
								</div>
								<div className='arrow'>
									<FontAwesomeIcon icon={faArrowRightLong} style={{ fontSize: "1.5em", color: "#165F81" }} />
								</div>
								<div className='destination'>
									{detail.ticket.addressEnd}
								</div>
							</div>
							<Divider style={{ padding: "0px 10px" }} />
							<div className='time-state-car'>
								<div className='time'>
									{detail.order.trip.timeStart}
								</div>
								<div class="flex justify-center items-center" >
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
									{Intl.NumberFormat().format(detail.ticket.price)}đ

								</div>
							</div>
							{openDetail === index ?
								<button onClick={() => onClickOrder(detail, index)}
									style={{ backgroundColor: "#2187b6", padding: "5px 10px", borderRadius: "10px" }}>Close</button>
								:
								<button onClick={() => onClickOrder(detail, index)}
									style={{ backgroundColor: "#2187b6", padding: "5px 10px", borderRadius: "10px" }}>Detail</button>
							}
							{
								openDetail === index
									? <BookingDetails bookingDetail={getDetail} />
									: null
							}
						</div>
					))
				}
			</div>
		</div>
	);
}

export default Mybooking;