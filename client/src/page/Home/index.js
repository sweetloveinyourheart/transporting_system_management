import React, { useEffect, useState } from 'react';
import homeIcon from '../../assets/home/Rectangle 4240.png';
import arrowIcon from '../../assets/home/arr.png';
import { DatePicker, Select, message } from 'antd';
import './style.css'
import { getProvince } from '../../services/province';
import { searchTrip } from '../../services/trip';
import { useNavigate } from 'react-router-dom';
import { getFormattedDate } from '../../utils/dateTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowRight, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
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

			const payload = {
				sourceCity,
				destinationCity,
				dateTime: getFormattedDate(searchDate["$d"])
			}

			const response = await searchTrip(
				sourceCity,
				destinationCity,
				getFormattedDate(searchDate["$d"])
			);

			navigate('/trip/select-car', { state: { data: response, payload } });
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className='home' style={{
			backgroundImage: "url(images/leaderboard.png)"
		}}>
			{/* panel */}
			<div className='panel'>
				{/* <img src='images/leaderboard.png' alt='panel' /> */}
			</div>
			{/* middle */}

			<ul className='flex flex-col items-center py-5 main' >
				<div className='relative'>
					<img
						src={homeIcon}
						alt='City Icon'
						className='absolute left-0 top-0 h-6 ml-1 mt-2'
						style={{ zIndex: 1 }}
					/>
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
					</Select>
				</div>
				<li className='my-2 cursor-pointer' onClick={handleSwapClick}>
					<img alt='error' src={arrowIcon}
						className='w-12' style={{ margin: "10px 0px" }} />
				</li>
				<div
					className='relative'
				>
					<img
						src={homeIcon}
						alt='City Icon'
						className='absolute left-0 top-0 h-6 ml-1 mt-2'
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
				<li className='flex flex-col mt-2 calendar'>
					<div className="relative flex items-center  rounded px-10 py-2 w-full cursor-pointer hover:opacity-75">
						<FontAwesomeIcon icon={faCalendarDays} style={{ color: "#165F81" }} className=" absolute z-10 ml-2 w-5" />
						<DatePicker className="flex-grow px-10 py-2 cursor-pointer hover:opacity-75"
							value={searchDate}
							onChange={handleDateChange}
							disabledDate={disabledDate}
							format="DD/MM/YYYY"
							placeholder="Choose from calendar"
							showTime={false}
							suffixIcon={
								<FontAwesomeIcon icon={faAngleRight} style={{ color: "#165f81" }} className=' absolute top-1 ml-4' />
							}
						/>
					</div>
				</li>
				{/* search button */}

				<li className='btn-search mt-5' onClick={handleSearch}>
					<button>SEARCH NOW</button>
					<i className="arrow-icon"><FontAwesomeIcon icon={faArrowRight} /></i>
				</li>
			</ul >
		</div >
	);
}

export default Home;
