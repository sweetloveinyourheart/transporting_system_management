import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../page/Home';
import Login from '../page/Login';
import Register from '../page/Register';
import Profile from '../page/Profile';
import ProvideContactDetails from '../page/ProvideContactDetails';
import ProvidePassengerDetails from '../page/ProvidePassengerDetails';
import SelectCarPage from '../page/SelectTrip/SelectCarPage';
import MyBookingPage from '../page/Mybooking';
import PayTickets from '../page/Payment'
import BookingDetails from '../page/BookingDetails';
import VerifyAllDetails from '../page/VerifyAllDetails';
import DriverPage from '../page/Driver';
import { Error } from '../page/Error/Error';


function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/contact-detail' element={<ProvideContactDetails />} />
			<Route path='/passenger-detail' element={<ProvidePassengerDetails />} />
			<Route path='/trip/select-car' element={<SelectCarPage />} />
			<Route path='/my-booking' element={<MyBookingPage />} />
			<Route path='/payment' element={<PayTickets />} />
			<Route path='/booking-details' element={<BookingDetails />} />
			<Route path='/verify-details' element={<VerifyAllDetails />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/driver/*" element={<DriverPage />} />
			<Route path="/*" element={<Error />} />
		</Routes>
	);
}

export default Router;