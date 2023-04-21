import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../assets/images/header/logo.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'
import { Dropdown, Space } from 'antd';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'

export default function Header() {
	const { user, signOut } = useAuth()

	const items = [
		{
			key: '1',
			label: (
				<Link className='drop-item' target="_blank" rel="noopener noreferrer" to={"/"}>
					<b><i>Home</i></b>
				</Link>
			),
		},
		{
			key: '2',
			label: (
				user ? (
					<Link className='drop-item' target="_blank" rel="noopener noreferrer" to={"/my-booking"}>
						<b><i>My Booking</i></b>
					</Link>
				) : null
			),
		},
		{
			key: '3',
			label: (
				user
					? (
						<Link to={"/profile"} className='drop-item' target="_blank" rel="noopener noreferrer"><b><i>Account</i></b></Link>
					)
					: null,
				user
					? <div onClick={() => signOut()}>Logout</div>
					: <Link to={"/login"} className='drop-item' target="_blank" rel="noopener noreferrer"><b><i>Login</i></b></Link>

			),
		},

	];

	return (
		<section className="nav-bar">
			<div className="header-container">
				<div className="row">
					<img className="logo" src={logo} alt="logo" />


					<ul className="nav-bar__menu-list">
						<li>
							<Link to={"/"}><i>Home</i></Link>
						</li>
						{
							user  &&
							(
								user?.role.roleId === "DRIVER"
									? (
										<li>
											<Link to={"/driver/*"}><i>Driver: {user?.user.fullName}</i></Link>
										</li>
									)
									: (
										<>
											<li>
												<Link to={"/my-booking"}><i>My Booking</i></Link>
											</li>
											<li>
												<Link to={"/profile"}><FontAwesomeIcon icon={faCircleUser} /></Link>
											</li>
										</>
									)
							)
						}
						<li>
							{user
								? <a href='#' onClick={() => signOut()}><i>Logout</i></a>
								: <Link to={"/login"}><i>Login</i></Link>
							}
						</li>
					</ul>
					<Dropdown className="nav"
						menu={{
							items,
						}}
					>
						<Link onClick={(e) => e.preventDefault()}>
							<Space>
								<FontAwesomeIcon icon={['fas', 'bars']} style={{ color: "#085071" }} />
							</Space>
						</Link>
					</Dropdown>

				</div>
			</div>
		</section>
	)
}