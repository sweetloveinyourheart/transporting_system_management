import React, { useEffect, useState } from 'react';
import panelImage from '../../assets/home/1760844.webp';
import homeIcon from '../../assets/home/Rectangle 4240.png';
import arrowIcon from '../../assets/home/arr.png';
import calendarIcon from '../../assets/home/Calendar.png';
import arr1 from '../../assets/home/arr1.png';
import arrowWhite from '../../assets/home/arrowWhite.png';
import { DatePicker, Select, message } from 'antd';
import './style.css'
import { getProvince } from '../../services/province';
import { searchTrip } from '../../services/trip';
import { useNavigate } from 'react-router-dom';
import { getFormattedDate } from '../../utils/dateTime';
function Home() {
    const [searchDate, setSearchDate] = useState();
    const [cities, setCities] = useState([]);
    const [sourceCity, setSourceCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const navigate = useNavigate();
    const handleSourceCitySelect = (value) => {
        setSourceCity(value);
        setDestinationCity('');
    }
    const handleDestinationCitySelect = (value) => {
        setDestinationCity(value);
    }
    const handleSwapClick = () => {
        const temp = sourceCity;
        setSourceCity(destinationCity);
        setDestinationCity(temp);
    };
    useEffect(() => {
        const fetchCityList = async () => {
            try {
                const cities = await getProvince();
                setCities(cities);
            } catch (error) {
                console.error('Error fetching city list:', error);
            }
        };
        fetchCityList();
    }, []);
    const handleDateChange = (date) => {
        setSearchDate(date);
    };
    const disabledDate = (current) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return current && current < today;
    };

    const handleSearch = async () => {
        try {
            if (!sourceCity || !destinationCity || !searchDate) {
                message.error("Please provide all required search information")
                return;
            }
            const response = await searchTrip(
                sourceCity,
                destinationCity,
                getFormattedDate(searchDate["$d"])
            );
            console.log("Check ......", response);
            navigate('/trip/select-car', { state: { data: response } });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {/* <Header /> */}
            <div className=''>
                {/* panel */}
                <div className=''>
                    <img className='' src={panelImage} alt='error' />
                </div>
                {/* middle */}

                <ul className='flex flex-col items-center py-5'>
                    <div
                        className='relative'
                        style={{ paddingLeft: '24px' }}>
                        <img
                            src={homeIcon}
                            alt='City Icon'
                            className='absolute left-0 top-0 h-6 ml-6 mt-2'
                            style={{ zIndex: 1 }} />
                        <Select
                            showSearch
                            placeholder='Source City'
                            onChange={handleSourceCitySelect}
                            value={sourceCity || undefined}
                            showArrow={false}
                        >
                            {cities ? cities.map(province => (
                                <Select.OptGroup key={province.provinceId} label={province.name}>
                                    {province.location.map(city => (
                                        <Select.Option key={city.locationId} value={city.name}>
                                            {city.name}
                                        </Select.Option>
                                    ))}
                                </Select.OptGroup>
                            )) : ''}
                        </Select>                    </div>
                    <li className='my-2 cursor-pointer' onClick={handleSwapClick}>
                        <img alt='error' src={arrowIcon}
                            className='w-12' />
                    </li>
                    <div
                        className='relative'
                        style={{ paddingLeft: '24px' }}>
                        <img
                            src={homeIcon}
                            alt='City Icon'
                            className='absolute left-0 top-0 h-6 ml-6 mt-2'
                            style={{ zIndex: 1 }} />
                        <Select
                            showSearch
                            placeholder='Destination City'
                            onChange={handleDestinationCitySelect}
                            disabled={sourceCity === ''}
                            value={destinationCity || undefined}
                        >
                            {cities ? cities.map(province => (
                                <Select.OptGroup key={province.provinceId} label={province.name}>
                                    {province.location
                                        .filter((city) => city.name !== sourceCity)
                                        .map((city) => (
                                            <Select.Option key={city.locationId} value={city.name}>
                                                {city.name}
                                            </Select.Option>
                                        ))}
                                </Select.OptGroup>
                            )) : ''}
                        </Select>
                    </div>
                    <li className='flex flex-col mt-5'>
                        <div className="relative flex items-center  rounded px-10 py-2 w-full cursor-pointer hover:opacity-75">
                            <img alt='error' src={calendarIcon} className=" absolute z-10 ml-2 w-5" />
                            <DatePicker className="flex-grow px-10 py-2 cursor-pointer hover:opacity-75"
                                value={searchDate}
                                onChange={handleDateChange}
                                disabledDate={disabledDate}
                                format="DD/MM/YYYY"
                                placeholder="Choose from calendar"
                                showTime={false}
                                suffixIcon={<img alt='error' src={arr1} className='w-fit h-fit  absolute p-1 m-0 absolute top-0 ml-4' />} />
                        </div>
                    </li>
                    {/* search button */}
                    <li className='mt-14'>
                        <button onClick={handleSearch} className='flex items-center bg-main-blue p-2 rounded-md
                            hover:opacity-75 transition'>
                            <span className='text-white w-56'>SEARCH NOW</span>
                            <div className='bg-dark-blue w-7 h-7 rounded-full
                                flex justify-center items-center'>
                                <img alt='error' src={arrowWhite} />
                            </div>
                        </button>
                    </li>
                </ul>
            </div >
            {/* <Footer /> */}
        </>
    );
}

export default Home;