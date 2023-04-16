import React from "react";
import "./style.css";
import { Typography } from "antd";
function BookingDetails() {
	const invoice = {
		departure: "Banglore ",
		destination: " Chennai",
		journeyDate: " 28/09/2021",
		bookingDate: " 21/092021",
		bookingStatus: " Successfully Booked.",
		ticketNumber: " BMT0000XXX5419780",
		bookingId: " 00001234",
		mobileNumber: " 1234567890",
		email: " patilgajanan1807@gmail.com",
		passengers: [
			{
				id: "1",
				number: "1",
				name: "Gajanan Patil",
				gender: "M",
				age: "21"
			},
			{
				id: "2",
				number: "2",
				name: "Suhas Patil",
				gender: "M",
				age: "46"
			},
		],
	};

	return (

		<div className="booking-details">
			<Typography.Title className="title">Booking Details</Typography.Title>
			<div className="details">
				<table>
					<tbody>
						<tr>
							<td className="details-title">Departure:</td>
							<td className="details-des">{invoice.departure}</td>
						</tr>
						<tr>
							<td className="details-title">Destination:</td>
							<td className="details-des">{invoice.destination}</td>
						</tr>
						<tr>
							<td className="details-title">Journey date:</td>
							<td className="details-des">{invoice.journeyDate}</td>
						</tr>
						<tr>
							<td className="details-title">Booking date:</td>
							<td className="details-des">{invoice.bookingDate}</td>
						</tr>
						<tr>
							<td className="details-title">Booking status:</td>
							<td className="details-des">{invoice.bookingStatus}</td>
						</tr>
						<tr>
							<td className="details-title">Ticket number:</td>
							<td className="details-des">{invoice.ticketNumber}</td>
						</tr>
						<tr>
							<td className="details-title">Booking ID:</td>
							<td className="details-des">{invoice.bookingId}</td>
						</tr>
						<tr>
							<td className="details-title">Mobile number:</td>
							<td className="details-des">{invoice.mobileNumber}</td>
						</tr>
						<tr>
							<td className="details-title">Email:</td>
							<td className="details-des">{invoice.email}</td>
						</tr>
						{invoice.passengers.map((inv, ind) => (
							<tr>
								<td className="details-title">Passenger {inv.number}:</td>
								<td className="details-des">{inv.name} {inv.gender} {inv.age}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>

	)
}

export default BookingDetails;