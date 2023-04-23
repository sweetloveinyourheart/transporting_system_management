import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth'
import './style.css'
import { Popover } from 'antd';
import { getSchedule } from '../../services/schedule';
import { getCurrentDate } from '../../utils/dateTime';

export default function MySchedulePage() {
    const [schedule, setSchedule] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());

    const { accessToken } = useAuth();
    //Get current day
    const currentDay = getCurrentDate();

    //Get schedule of driver
    useEffect(() => {
        getSchedule(accessToken).then(res => {
            setSchedule(res);
        })
    }, [])

    //Click prev month
    const handlePrevMonth = () => {
        if (month === 0) {
            // setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    };
    //Click next month
    const handleNextMonth = () => {
        if (month === 11) {
            // setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    };

    //Name of each month
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    //Get all day in month
    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    //Get first day of month
    const firstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    //render day month and event in day
    const renderCalendar = () => {
        const days = [];
        const daysInSelectedMonth = daysInMonth(month, year);
        const firstDay = firstDayOfMonth(month, year);
        const eventsByDay = {};

        schedule.trip?.forEach(event => {
            let date = new Date(event.timeStart);
            //Check month and year of timeStart = month and year of calendar
            if (date.getMonth() === month && date.getFullYear() === year) {
                const dayEvent = date.getDate();
                //Check dayEvent in eventsByDay if not an array it will create an empty array at that index
                if (!eventsByDay[dayEvent]) {
                    eventsByDay[dayEvent] = [];
                }
                //Then push data to array eventsByDay[dayEvent]
                eventsByDay[dayEvent].push(event);
            }

        });

        // Disable all day before the first day of month is selected
        for (let i = 1; i < firstDay; i++) {
            days.push(<li key={`prev-${i}`} className="disabled"></li>);
        }

        //Active all day of the month in selected
        for (let i = 1; i <= daysInSelectedMonth; i++) {
            const events = eventsByDay[i] || [];
            days.push(
                <li
                    style={{ border: "1px solid", display: 'inline-grid' }}
                    key={`day-${i}`}
                    className={i === new Date().getDate() ? "active" : ""}
                >
                    {i}
                    <div style={{ display: 'contents' }}>
                        {
                            events.map((event, index) => (
                                events.length === 1 ?
                                    <div key={event.tripId} style={{ display: 'flex', flexDirection: 'column' }}>
                                        {/* If time start < currentDay then this trip is finish */}
                                        {event.timeStart < currentDay ?
                                            <p className='text-green-500 font-bold'>Finish</p>
                                            : <p className='text-blue-400 font-bold'>{event.timeStart.substring(11, 16)}</p>
                                        }
                                        <p className='text-blue-500 '>{event.provinceStart}</p>
                                        <p>to</p>
                                        <p className='text-blue-500 '>{event.provinceEnd}</p>
                                    </div>
                                    :
                                    <Popover key={event.tripId}
                                        content={
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <p className='text-gray-900 font-bold'>Province Start:
                                                    <a className='text-blue-400'>{event.provinceStart}</a>
                                                </p>
                                                <p className='text-gray-900 font-bold'>Pickup Location:
                                                    <a className='text-blue-400'>{event.pickupLocation}</a>
                                                </p>
                                                <p style={{ color: 'blue' }}>To</p>
                                                <p className='text-gray-900 font-bold'>Province End:
                                                    <a className='text-green-400'> {event.provinceEnd}</a>
                                                </p>
                                                <p className='text-gray-900 font-bold'>Dropoff Location:
                                                    <a className='text-green-400'>{event.dropOffLocation}</a>
                                                </p>
                                            </div>
                                        }>
                                        <p className='text-blue-500'>Ongoing:{event.timeStart.substring(11, 16)}</p>
                                    </Popover>
                            ))
                        }
                    </div>

                </li>
            );
        }

        return days;
    };

    return (
        <div className='calendar'>
            <div className="month">
                <ul>
                    <li onClick={handlePrevMonth} className="prev">&#10094;</li>
                    <li onClick={handleNextMonth} className="next">&#10095;</li>
                    <li>
                        {/* {month}<br /> */}
                        {monthNames[month]}<br />
                        <span style={{ fontSize: "18px" }}>{year}</span>
                    </li>
                </ul>
            </div>

            <ul className="weekdays">
                <li>Mo</li>
                <li>Tu</li>
                <li>We</li>
                <li>Th</li>
                <li>Fr</li>
                <li>Sa</li>
                <li>Su</li>
            </ul>

            <ul className="days">
                {renderCalendar()}
            </ul>
        </div>
    )
}