import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../page/Home';
import Login from '../../page/Login';
import Register from '../../page/Register';
import Profile from '../../page/Profile';
function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
        </Routes>
    );
}

export default Router;