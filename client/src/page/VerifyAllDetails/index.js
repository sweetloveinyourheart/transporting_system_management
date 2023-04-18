import React from "react";
import "./style.css";
import { Typography } from "antd";
import { BackToFront } from "../../components/Back/Back";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
function VerifyAllDetails() {
	const confirm = {
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
		<div className="verify-all-details">
			<Typography.Title className="title">Verify All Details</Typography.Title>
			<div className="details">
				<table>
					<tbody>
						<tr>
							<td className="details-title">Departure:</td>
							<td className="details-des">{confirm.departure}</td>
						</tr>
						<tr>
							<td className="details-title">Destination:</td>
							<td className="details-des">{confirm.destination}</td>
						</tr>
						<tr>
							<td className="details-title">Journey date:</td>
							<td className="details-des">{confirm.journeyDate}</td>
						</tr>
						<tr>
							<td className="details-title">Booking date:</td>
							<td className="details-des">{confirm.bookingDate}</td>
						</tr>
						<tr>
							<td className="details-title">Booking status:</td>
							<td className="details-des">{confirm.bookingStatus}</td>
						</tr>
						<tr>
							<td className="details-title">Ticket number:</td>
							<td className="details-des">{confirm.ticketNumber}</td>
						</tr>
						<tr>
							<td className="details-title">Booking ID:</td>
							<td className="details-des">{confirm.bookingId}</td>
						</tr>
						<tr>
							<td className="details-title">Mobile number:</td>
							<td className="details-des">{confirm.mobileNumber}</td>
						</tr>
						<tr>
							<td className="details-title">Email:</td>
							<td className="details-des">{confirm.email}</td>
						</tr>
						{confirm.passengers.map((inv, ind) => (
							<tr>
								<td className="details-title">Passenger {inv.number}:</td>
								<td className="details-des">{inv.name} {inv.gender} {inv.age}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="btn-back-continue">
				<BackToFront />
				<div className='btn-continue'>
					<button>PROCEED TO PAY</button>
					<i className="arrow-icon"><FontAwesomeIcon icon={faArrowRight} /></i>
				</div>
			</div>
		</div>

	)
}

export default VerifyAllDetails;