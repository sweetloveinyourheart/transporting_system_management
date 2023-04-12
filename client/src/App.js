import './assets/styles/fonts.css'
import "./assets/fontawesome"
import './App.css';
import Home from './page/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import ProvideContactDetails from './page/ProvideContactDetails';
import ProvidePassengerDetails from './page/ProvidePassengerDetails';
import SelectCarPage from './page/SelectTrip/SelectCarPage';
import SelectSeatPage from './page/SelectTrip/SelectSeat';
import MyBookingPage from './page/Mybooking/Mybooking';
import PayTickets from './page/Payment'

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/contact-detail' element={<ProvideContactDetails />} />
				<Route path='/passenger-detail' element={<ProvidePassengerDetails />} />
				<Route path='/trip/select-car' element={<SelectCarPage />} />
				<Route path='/trip/select-seat' element={<SelectSeatPage />} />
				<Route path='/my-booking' element={<MyBookingPage />} />z
				<Route path='/payment' element={<PayTickets />} />
			</Routes>
		</div>
	);
}

export default App;
