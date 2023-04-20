import React, { useEffect, useState } from "react"
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserXmark } from "@fortawesome/free-solid-svg-icons"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { Input, Typography } from "antd"
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { BackToFront } from "../../components/Back/Back"
import { message } from "antd"

export default function ProvidePassengerDetails() {
	const [inputPassengerName, setInputPassengerName] = useState("");
	const [inputAge, setInputAge] = useState("");
	const [inputGenger, setInputGender] = useState("");
	const [passengerDetailsList, setPassengerDetailsList] = useState([]);

	let inCreId = 0;
	const deleteDetails = (ind) => {
		const passengerDetailsListCopy = [...passengerDetailsList];
		passengerDetailsListCopy.splice(ind, 1);
		setPassengerDetailsList(passengerDetailsListCopy);
	}

	const handleAddPassenger = () => {
		if (inputPassengerName !== '' && inputAge !== '' && inputGenger !== '') {
			setPassengerDetailsList([...passengerDetailsList, {
				id: inCreId + 1,
				name: inputPassengerName,
				age: inputAge,
				gender: inputGenger
			}])
			console.log(passengerDetailsList);
		} else {
			message.error("Please fill all")
		}
	}
	return (
		<div className="provide-passenger-details">
			<Typography.Title className="passenger-title">
				Provide Passenger Details
			</Typography.Title>
			<div className="inp-details" >
				<div className="inp-name-age" >
					<div className="inp-name">
						<Input prefix={<UserOutlined className="site-form-item-icon" />} type='text' placeholder='Enter Passenger Name' name='name' value={inputPassengerName} onChange={(e) => {
							setInputPassengerName(e.target.value)
						}} />
					</div>
					<div className="inp-age">
						<Input
							prefix={<ClockCircleOutlined className="site-form-item-icon" />}
							type='text' placeholder='Age'
							name='age' value={inputAge}
							onChange={(e) => {
								setInputAge(e.target.value)
							}}
						/>
					</div>
				</div>
				<div className="inp-gender">
					<p className="title-gender">Gender: </p>
					<form>
						<div>
							<input type="radio" name="gender" value={"male"} onClick={() => setInputGender('Male')} />
							<label htmlFor="male">Male</label>
						</div>
						<div>
							<input type="radio" name="gender" value={"female"} onClick={() => setInputGender('Female')} />
							<label htmlFor="female">Female</label>
						</div>
						<div>
							<input type="radio" name="gender" value={"other"} onClick={() => setInputGender('Other')} />
							<label htmlFor="other">Other</label>
						</div>
					</form>
				</div>
				<div className="submit-details">
					<div className='right-col'>
						<button onClick={handleAddPassenger}>ADD PASSENGER </button>
						<i className="arrow-icon"><FontAwesomeIcon icon={faArrowRight} /></i>
					</div>
				</div>
			</div>
			<div className='passenger-details'>
				<div className='details-title'>Passenger Details:</div>
				<table className="wrap-details">
					<tbody>
						{passengerDetailsList.map((detail, index) => (
							<tr className='details' key={index}>
								<td className='name'>{detail.name}</td>
								<td className='gender'>{detail.gender}</td>
								<td className='age'>{detail.age}</td>
								<td>
									<FontAwesomeIcon icon={faUserXmark} style={{ color: "#CF6565", cursor: "pointer" }} onClick={() => deleteDetails(index)} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="btn-back-continue">
				<BackToFront />
				<div className='btn-continue'>
					<button >CONTINUE</button>
					<i className="arrow-icon"><FontAwesomeIcon icon={faArrowRight} /></i>
				</div>
			</div>
		</div>
	)
}