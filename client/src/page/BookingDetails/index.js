import React,{useState}  from "react";
import "./index.css";
function BookingDetails() {
    const [invoice, setInvoice] = useState({
      sourceCity: " ",
      destinationCity: " ",
      journeyDate: " ",
      bookingDate: " ",
      bookingStatus: " ",
      ticketNumber: " ",
      bookingId: " ",
      mobileNumber: " ",
      email: " ",
      pickUpAddress: " ",
      destinationAddress: " ",
      passengers: [ ],
    });

  return (
    <>
    
    <div className="container">
      <h2>Booking Details</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>Source city:</th>
            <td>{invoice.sourceCity}</td>
          </tr>
          <tr>
            <th>Destination city:</th>
            <td>{invoice.destinationCity}</td>
          </tr>
          <tr>
            <th>Journey date:</th>
            <td>{invoice.journeyDate}</td>
          </tr>
          <tr>
            <th>Booking date:</th>
            <td>{invoice.bookingDate}</td>
          </tr>
          <tr>
            <th>Booking status:</th>
            <td>{invoice.bookingStatus}</td>
          </tr>
          <tr>
            <th>Ticket number:</th>
            <td>{invoice.ticketNumber}</td>
          </tr>
          <tr>
            <th>Booking ID:</th>
            <td>{invoice.bookingId}</td>
          </tr>
          <tr>
            <th>Mobile number:</th>
            <td>{invoice.mobileNumber}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{invoice.email}</td>
          </tr>
          <tr>
            <th>Pick up address:</th>
            <td>{invoice.pickUpAddress}</td>
          </tr>
          <tr>
            <th>Destination address:</th>
            <td>{invoice.destinationAddress}</td>
          </tr>
          <tr>
            <th>Passengers 1:</th>
            <td>{invoice.passengers.join(", ")}</td>
          </tr>
          <tr>
            <th>Passengers 2:</th>
            <td>{invoice.passengers.join(", ")}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
    
  )
}

export default BookingDetails;