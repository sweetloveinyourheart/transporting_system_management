import React,{useState}  from "react";
import "./index.css";
import {Button} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';


function VerifyAllDetails() {
    const [confirm, setConfirm] = useState({
      sourceCity: " ",
      destinationCity: " ",
      journeyDate: " ",
      mobileNumber: " ",
      email: " ",
      pickUpAddress: " ",
      destinationAddress: " ",
      passengers1: [ ],
      passengers2: [ ],
    });

  return (
    <div className="container">
      <h1>Verify All Details</h1>
      <table className="table">
        <tbody>
          <tr>
            <th>Source city:</th>
            <td>{confirm.sourceCity}</td>
          </tr>
          <tr>
            <th>Destination city:</th>
            <td>{confirm.destinationCity}</td>
          </tr>
          <tr>
            <th>Journey date:</th>
            <td>{confirm.journeyDate}</td>
          </tr>
          <tr>
            <th>Mobile number:</th>
            <td>{confirm.mobileNumber}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{confirm.email}</td>
          </tr>
          <tr>
            <th>Pick up address:</th>
            <td>{confirm.pickUpAddress}</td>
          </tr>
          <tr>
            <th>Destination address:</th>
            <td>{confirm.destinationAddress}</td>
          </tr>
          <tr>
            <th>Passengers 1:</th>
            <td>{confirm.passengers1.join(", ")}</td>
          </tr>
          <tr>
            <th>Passengers 2:</th>
            <td>{confirm.passengers2.join(", ")}</td>
          </tr>
        </tbody>
      </table>
      <div className="btnproceed">
        <tr>
         <Button  type='primary'  htmlType='submit' block  >PROCEED TO PAY {<ArrowRightOutlined />}</Button>       
        </tr> 
      </div>
    </div>
  )
}

export default VerifyAllDetails;