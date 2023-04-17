import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import { Input, Typography } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons"
import { BackToFront } from "../../components/Back/Back";
export default function ProvideContactDetails() {
	const [inputEmail, setInputEmail] = useState("");
	const [inputPhoneNumber, setInputPhoneNumber] = useState("");
	const [contactDetailsList, setContactDetailsList] = useState("");
	let inCreId = 0;
	return (
		<div className="provide-contact-details">
			<Typography.Title className="contact-title">Provide Contact Details</Typography.Title>
			<div className="inp-details">
				<div className="inp-email">
					<Input prefix={<MailOutlined className="site-form-item-icon" />} type='email' placeholder='Enter Email Address' name='email' value={inputEmail} onChange={(e) => {
						setInputEmail(e.target.value)
					}} />
				</div>
				<div className="inp-phone-number">
					<Input prefix={<PhoneOutlined className="site-form-item-icon" />} type='text' placeholder='Enter Phone Number' name='phone-number' value={inputPhoneNumber} onChange={(e) => {
						setInputPhoneNumber(e.target.value)
					}} />
				</div>
				<div className="note">
					<p>
						Note : Ticket Details will be sent to this E-mail and phone
					</p>
				</div>
			</div>
			<div className="btn-back-continue">
				<BackToFront />
				<div className='btn-continue' onClick={() => {
					setContactDetailsList([...contactDetailsList, { id: inCreId + 1, email: inputEmail, phoneNumber: inputPhoneNumber }])
				}}>
					<button>CONTINUE</button>
					<i className="arrow-icon"><FontAwesomeIcon icon={faArrowRight} /></i>
				</div>
			</div>
		</div>
	)
}