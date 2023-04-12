import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../../assets/images/header/logo.png'

export default function Header() {
    return (
        <section className="nav-bar">
            <div className="header-container">
                <div className="row">
                    <div className="col">
                        <div>
                            <i className="nav">
                                <FontAwesomeIcon icon={['fas', 'bars']} />
                            </i>
                            <img className="logo" src={logo} alt="logo" />
                        </div>
                    </div>
                    <div className="col">
                        <ul className="nav-bar__menu-list">
                            <li>
                                <a href="#"><i>Home</i></a>
                            </li>
                            <li>
                                <a href="#"><i>My Booking</i></a>
                            </li>
                            <li>
                                <a href="#"><i>About</i></a>
                            </li>
                            <li>
                                <a href="#"><i>Login</i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}