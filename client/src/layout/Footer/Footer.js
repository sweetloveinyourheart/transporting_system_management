import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './footer.css'
import { Link } from "react-router-dom"


export default function Footer() {
	return (
		<section className="footer">
			<div className="footer-container">
				<div className="row">
					<ul className="footer__social-list">
						<li>
							<Link to={"#"}>
								<i>
									<FontAwesomeIcon icon={['fab', 'facebook-f']} />
								</i>
							</Link>
						</li>
						<li>
							<Link to={"#"}>
								<i>
									<FontAwesomeIcon icon={['fab', 'instagram']} />
								</i>
							</Link>
						</li>
						<li>
							<Link to={"#"}>
								<i>
									<FontAwesomeIcon icon={['fab', 'twitter']} />
								</i>
							</Link>
						</li>
					</ul>
					<div className="footer__list-link">
						<div>
							<Link to={"#"}>Privacy Policy</Link>
							<Link to={"#"}>Need Help?</Link>
						</div>
						<div>
							<Link to={"#"}>About</Link>
							<Link to={"#"}>Terms & Conditions</Link>
						</div>
						<div>
							<Link to={"#"}>FAQs</Link>
							<Link to={"#"}>Contact Us</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}