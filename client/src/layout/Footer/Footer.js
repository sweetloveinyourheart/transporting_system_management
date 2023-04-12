import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './footer.css'


export default function Footer() {
    return (
        <section class="footer">
            <div class="footer-container">
                <div class="row">
                    <div class="col">
                        <ul class="footer__social-list">
                            <li>
                                <a href="#">
                                    <i>
                                        <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                                    </i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i>
                                        <FontAwesomeIcon icon={['fab', 'instagram']} />
                                    </i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i>
                                        <FontAwesomeIcon icon={['fab', 'twitter']} />
                                    </i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col">
                        <div class="footer__list-link">
                            <div>
                                <a href="#">Privacy Policy</a>
                                <a href="#">Need Help?</a>
                            </div>
                            <div>
                                <a href="#">About</a>
                                <a href="#">Terms & Conditions</a>
                            </div>
                            <div>
                                <a href="#">FAQs</a>
                                <a href="#">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}