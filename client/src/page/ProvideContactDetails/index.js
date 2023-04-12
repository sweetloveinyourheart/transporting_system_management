import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faPhone } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
export default function ProvideContactDetails() {
	const [inputEmail, setInputEmail] = useState("");
	const [inputPhoneNumber, setInputPhoneNumber] = useState("");
	const [contactDetailsList, setContactDetailsList] = useState("");
	let inCreId = 0;
	return (
		<div className="provide-contact-details">
			<div className="contact-title">Provide Contact Details</div>
			<div className="inp-details">
				<div className="inp-email">
					<i>
						<FontAwesomeIcon icon={faEnvelope} style={{ color: "#807A7A", padding: "5px" }} />
					</i>
					<input type='email' placeholder='Enter Email Address' name='email' value={inputEmail} onChange={(e) => {
						setInputEmail(e.target.value)
					}} />
				</div>
				<div className="inp-phone-number">
					<i>
						<FontAwesomeIcon icon={faPhone} style={{ color: "#807A7A", padding: "5px" }} />
					</i>
					<input type='text' placeholder='Enter Phone Number' name='phone-number' value={inputPhoneNumber} onChange={(e) => {
						setInputPhoneNumber(e.target.value)
					}} />
				</div>
				<div className="note">
					<p>
						Note : Ticket Details will be sent to this E-mail and phone
					</p>
				</div>
			</div>
			<div className='btn-continue' onClick={() => {
				setContactDetailsList([...contactDetailsList, { id: inCreId + 1, email: inputEmail, phoneNumber: inputPhoneNumber }])
			}}>
				<button>CONTINUE</button>
				<i className="arrow-icon"><FontAwesomeIcon icon={faArrowRight} /></i>
			</div>
		</div>
	)
}