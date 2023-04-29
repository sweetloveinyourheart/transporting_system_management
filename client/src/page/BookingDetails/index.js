import React, { useMemo } from "react";
import "./style.css";
import { Typography } from "antd";

function BookingDetails(props) {
	const detail = useMemo(() => props.bookingDetail);

	return (
		<div className="booking-details">
			<Typography.Title className="title">Booking Details</Typography.Title>
			<div className="details">
				<table>
					<tbody>
						<tr>
							<td className="details-title">Departure:</td>
							<td className="details-des">{detail.ticket.addressStart}</td>
						</tr>
						<tr>
							<td className="details-title">Destination:</td>
							<td className="details-des">{detail.ticket.addressEnd}</td>
						</tr>
						<tr>
							<td className="details-title">Journey date:</td>
							<td className="details-des">{detail.order.trip.timeStart.substring(0, 10)}</td>
						</tr>
						{/* <tr>
							<td className="details-title">Booking date:</td>
							<td className="details-des"></td>
						</tr> */}
						<tr>
							<td className="details-title">Booking status:</td>
							{detail.status === true ? <td style={{ color: "green" }} className="details-des">Booking Success</td>
								: <td style={{ color: "red" }} className="details-des">Cancel</td>}
						</tr>
						<tr>
							<td className="details-title">Chair number:</td>
							<td className="details-des">{detail.chair.chairNumber}</td>
						</tr>
						<tr>
							<td className="details-title">Booking ID:</td>
							<td className="details-des">{detail.order.orderId}</td>
						</tr>
						<tr>
							<td className="details-title">Passenger:</td>
							<td className="details-des">{detail.order.user.fullName}</td>
						</tr>
						<tr>
							<td className="details-title">Mobile number:</td>
							<td className="details-des">{detail.order.user.phoneNumber}</td>
						</tr>
						<tr>
							<td className="details-title">Email:</td>
							<td className="details-des">{detail.order.user.email}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

	)
}

export default BookingDetails;