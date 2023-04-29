import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./style.css"
import { useState } from 'react';
import { Typography } from 'antd';
import { BackToFront } from '../../components/Back/Back';
export default function PayTickets() {
	const [showDetail, setShowDetail] = useState(false);
	const onlinePaymentDetails = [
		{
			id: "1",
			link: "",
			alt: "apple payment",
			image: "images/apple-pay.png",
		},
		{
			id: "2",
			link: "",
			alt: "stripe payment",
			image: "images/stripe-pay.png",
		},
		{
			id: "3",
			link: "",
			alt: "paypal payment",
			image: "images/pay-pal.png",
		},
	]
	const [rotate, setRotate] = useState(false);

	function handleClick() {
		setShowDetail(!showDetail)
		setRotate(!rotate);
	}

	const charStyle = {
		transform: rotate ? 'rotate(90deg)' : 'none'
	};
	return (
		<div className="payment-tickets">
			<Typography.Title className="payment-title">
				Payment Tickets
			</Typography.Title>
			<div className="payment-wrapper">
				<div className="select-option">
					<div className="option-title">
						SELECT OPTION TO PAY
					</div>
					<div className="online" onClick={handleClick}>
						<div className='wrap-logo-title'>
							<div className="logo-onl">
								<img src="images/epay.png" alt="logo" />
							</div>
							<div className="title-description"  >
								<p className="title"><b> Online </b></p>
								<p className="description">Online Payment</p>
							</div>
						</div>
						<div className="arrow-drop" >
							<FontAwesomeIcon icon={faAngleRight}
								style={charStyle}
							/>
						</div>
					</div>
					{
						showDetail ? (
							<div className="online-payment-details">
								{
									onlinePaymentDetails.map((detail, ind) => (
										<div key={ind} className="detail">
											<img src={detail.image} alt={detail.alt} />
										</div>
									))
								}
							</div>
						) : ("")
					}
					<div className="physically">
						<div className="logo-phy">
							<img src="images/physical_pay.png" alt="physically" />
						</div>
						<div className="title-description">
							<p className="title"><b> Physically </b></p>
							<p className="description">Pay with cash</p>
						</div>
					</div>
				</div>
				<div className="price">
					<p className="title">Price</p>
					<p className="value">6.5$</p>
				</div>
				<div className='btn-back-sub'>
					<BackToFront />
					<div className="payment-sub">
						<button>PAYMENT</button>
					</div>
				</div>
			</div>
		</div>
	)
}