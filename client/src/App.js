import './assets/styles/fonts.css'
import "./assets/fontawesome"
import './App.css';
import Home from './page/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import ProvideContactDetails from './page/ProvideContactDetails';
import ProvidePassengerDetails from './page/ProvidePassengerDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contact-detail' element={<ProvideContactDetails />} />
        <Route path='/passenger-detail' element={<ProvidePassengerDetails />} />
      </Routes>
    </div>
  );
}

export default App;
