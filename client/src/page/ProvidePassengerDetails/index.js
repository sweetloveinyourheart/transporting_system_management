import React, { useState } from "react"
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faUserClock, faUserXmark } from "@fortawesome/free-solid-svg-icons"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"


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

	return (
		<div className="provide-passenger-details">
			<div className="passenger-title">
				Provide Passenger Details
			</div>
			<div className="inp-details" >
				<div className="inp-name-age" >
					<div className="inp-name">
						<i>
							<FontAwesomeIcon icon={faUser} style={{ color: "#807A7A" }} />
						</i>
						<input type='text' placeholder='Enter Passenger Name' name='name' value={inputPassengerName} onChange={(e) => {
							setInputPassengerName(e.target.value)
						}} />
					</div>
					<div className="inp-age">
						<i>
							<FontAwesomeIcon icon={faUserClock} style={{ color: "#807A7A" }} />
						</i>
						<input type='text' placeholder='Age' name='age' value={inputAge} onChange={(e) => {
							setInputAge(e.target.value)
						}} />
					</div>
				</div>
				<div className="inp-gender">
					<p className="title-gender">Gender: </p>
					<form>
						<div>
							<input type="radio" name="gender" value={"male"} checked={inputGenger === "Male"} onClick={() => setInputGender('Male')} />
							<label htmlFor="male">Male</label>
						</div>
						<div>
							<input type="radio" name="gender" value={"female"} checked={inputGenger === "Female"} onClick={() => setInputGender('Female')} />
							<label htmlFor="female">Female</label>
						</div>
						<div>
							<input type="radio" name="gender" value={"other"} checked={inputGenger === "Other"} onClick={() => setInputGender('Other')} />
							<label htmlFor="other">Other</label>
						</div>
					</form>
				</div>
				<div className="submit-details">
					<div className='right-col' onClick={() => {
						setPassengerDetailsList([...passengerDetailsList, { id: inCreId + 1, name: inputPassengerName, age: inputAge, gender: inputGenger }])
						console.log(passengerDetailsList);
					}}>
						<button >ADD PASSENGER </button>
						<i className="arrow-icon"><FontAwesomeIcon icon={faArrowRight} /></i>
					</div>
				</div>
			</div>
			<div className='passenger-details'>
				<div className='details-title'>Passenger Details:</div>
				<table className="wrap-details">
					{passengerDetailsList.map((detail, index) => (
						<tr className='details'>
							<td className='name'>{detail.name}</td>
							<td className='gender'>{detail.gender}</td>
							<td className='age'>{detail.age}</td>
							<td>
								<FontAwesomeIcon icon={faUserXmark} style={{ color: "#CF6565", cursor: "pointer" }} onClick={() => deleteDetails(index)} />

							</td>
						</tr>
					))}
				</table>
			</div>
			<div className='btn-continue'>
				<button>CONTINUE</button>
				<i className="arrow-icon"><FontAwesomeIcon icon={faArrowRight} /></i>
			</div>
		</div>
	)
}