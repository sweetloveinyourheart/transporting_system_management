import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Select, Divider, Typography, } from 'antd';
import './style.css';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';


const handleChange = (value) => {
	console.log(`selected ${value}`);
};
const myBooking = [
	{
		departure: "Banglore",
		destination: "Chennai",
		time: "28 Dec 2021",
		car: "AC Sleeper(2+1)"
	},
	{
		departure: "Banglore",
		destination: "Chennai",
		time: "28 Dec 2021",
		car: "AC Sleeper(2+1)"
	},
]

function Mybooking() {
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
									Up Coming
								</div>
								<div className='car'>
									{detail.car}
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