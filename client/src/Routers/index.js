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

function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />   {/* boqua */}
			<Route path='/login' element={<Login />} /> {/* done */}
			<Route path='/register' element={<Register />} />  {/* done */}
			<Route path='/contact-detail' element={<ProvideContactDetails />} /> {/* done */}
			<Route path='/passenger-detail' element={<ProvidePassengerDetails />} /> {/* done */}
			<Route path='/trip/select-car' element={<SelectCarPage />} /> 						{/* boqua */}
			<Route path='/my-booking' element={<MyBookingPage />} /> {/* done */}
			<Route path='/payment' element={<PayTickets />} /> {/* done */}
			<Route path='/booking-details' element={<BookingDetails />} /> {/* done */}
			<Route path='/verify-details' element={<VerifyAllDetails />} />
			<Route path="/profile" element={<Profile />} />         {/* boqua */}
		</Routes>
	);
}

export default Router;