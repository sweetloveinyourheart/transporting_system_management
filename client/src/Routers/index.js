import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../page/Home';
import Login from '../page/Login';
import Register from '../page/Register';
import Profile from '../page/Profile';
import ProvideContactDetails from '../page/ProvideContactDetails';
import ProvidePassengerDetails from '../page/ProvidePassengerDetails';
import SelectCarPage from '../page/SelectTrip/SelectCarPage';
import MyBookingPage from '../page/Mybooking/Mybooking';
import PayTickets from '../page/Payment'
import BookingDetails from '../page/BookingDetails';
import VerifyAllDetails from '../page/VerifyAllDetails';

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
            <Route path='/booking-detail' element={<BookingDetails />} />
            <Route path='/verify-detail' element={<VerifyAllDetails />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default Router;