import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../assets/images/header/logo.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'

export default function Header() {

    const { user } = useAuth()

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
                                <Link to={"#"}><i>Home</i></Link>
                            </li>
                            <li>
                                <Link to={"#"}><i>My Booking</i></Link>
                            </li>
                            <li>
                                <Link to={"#"}><i>About</i></Link>
                            </li>
                            {user
                                ? (
                                    <li>
                                        <Link to={"/profile"}><i>Account</i></Link>
                                    </li>
                                )
                                : null
                            }
                            <li>
                                {user ? "Logout" : <Link to={"/login"}><i>Login</i></Link>}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}