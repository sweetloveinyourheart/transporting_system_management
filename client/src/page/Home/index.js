import React, { useRef, useState } from 'react';
import panelImage from '../../assets/home/1760844.webp';
import homeIcon from '../../assets/home/Rectangle 4240.png';
import arrowIcon from '../../assets/home/arr.png';
import calendarIcon from '../../assets/home/Calendar.png';
import arr1 from '../../assets/home/arr1.png';
import arrowWhite from '../../assets/home/arrowWhite.png';

function Home() {
    const dateInputRef = useRef(null);
    const [searchDate, setSearchDate] = useState();

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
                    <li className='flex border rounded px-2 py-2 my-2'>
                        <img alt='error' src={homeIcon} className='' />
                        <input className='outline-none placeholder:text-base placeholder:font-medium
                            text-center w-72'
                            placeholder='Source City' />
                    </li>
                    <li className='my-2'>
                        <img alt='error' src={arrowIcon}
                            className='w-12' />
                    </li>
                    <li className='flex border rounded px-2 py-2 my-2'>
                        <img alt='error' src={homeIcon} className='' />
                        <input className='outline-none placeholder:text-base placeholder:font-medium
                            text-center w-72'
                            placeholder='Destination City' />
                    </li>
                    {/* calendar */}
                    <li className='flex flex-col mt-5'>
                        <div className='flex border rounded px-3 py-2 items-center
                            select-none cursor-pointer hover:opacity-75'
                            onClick={() => {
                                if (dateInputRef.current) {
                                    dateInputRef.current.showPicker();
                                }
                            }}>
                            <img alt='error' src={calendarIcon}
                                className='w-5' />
                            <span className='text-gray-400 mx-5'>
                                {
                                    searchDate ?
                                        searchDate.toLocaleString()
                                        :
                                        "Choose from calender"
                                }
                            </span>
                            <img alt='error' src={arr1}
                                className='w-fit h-fit' />
                            {/* real date picker */}
                            <input ref={dateInputRef} type='datetime-local'
                                onChange={(e) => { setSearchDate(new Date(e.target.value)) }}
                                className='w-0 h-0' />
                        </div>
                        <div className='flex justify-center mt-3'>
                            <button className='px-3 py-2 font-medium
                                border rounded text-sm text-gray-400 mr-2
                                hover:brightness-90 transition'>
                                Today
                            </button>
                            <button className='px-5 py-2 font-medium
                                border rounded text-sm
                                bg-main-blue text-white
                                hover:brightness-90 transition'>
                                Tomorrow
                            </button>
                        </div>
                    </li>
                    {/* search button */}
                    <li className='mt-14'>
                        <button className='flex items-center bg-main-blue p-2 rounded-md
                            hover:opacity-75 transition'>
                            <span className='text-white w-56'>SEARCH NOW</span>
                            <div className='bg-dark-blue w-7 h-7 rounded-full
                                flex justify-center items-center'>
                                <img alt='error' src={arrowWhite} />
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default Home;