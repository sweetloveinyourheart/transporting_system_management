import { useState } from 'react';
import SelectSeat from './SelectSeat';
import './css/SelectCarPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
export default function SelectCarPage() {
    const [position, setPosition] = useState();
    const onChooseTrip = (index) => {
        setPosition(index);
        if (index === position) {
            setPosition();
        }
    }
    const location = useLocation();
    const searchResult = location.state && location.state.data ? location.state.data : [];
    const { content } = searchResult;
    const formatTime = (time) => {
        const timeParts = time.split(" ");
        return timeParts[1];
    };
    return (
        <div className="select-car-page">
            <div className="col">
                <p className="select-car-page__title">Select The Trip</p>
            </div>
            <div>
                <div className="col">
                    {content.length > 0 ? (
                        <div className="select-car-page__list">
                            {content ? content.map((trip, index) => (
                                <div key={trip.tripId || ""} className="car">
                                    <div className="car__type-price">
                                        <p style={{ fontWeight: 500, fontSize: "20px" }}>Time start: {formatTime(trip.timeStart || "")}</p>
                                        <p style={{ fontWeight: 500, fontSize: "15px" }}>Price: {trip.price || ""}</p>
                                    </div>
                                    <div className="car__time-and-button">
                                        <div className="car__time">
                                            <div className='car__time-icon'>
                                                <i>
                                                    <FontAwesomeIcon icon={['far', 'clock']} />
                                                </i>
                                                <i>
                                                    <FontAwesomeIcon icon={['far', 'clock']} />
                                                </i>
                                            </div>
                                            <div>
                                                <p>Departure Place</p>
                                                <p>Journey Place</p>
                                            </div>
                                            <div>
                                                <p style={{
                                                    fontSize: "60px",
                                                    margin: 0,
                                                    // transform: "translateY(-0px)",
                                                    fontWeight: 100,
                                                    opacity: 0.3
                                                }}>
                                                    |
                                                </p>
                                            </div>
                                            <div>
                                                <p>{trip.provinceStart || ""}</p>
                                                <p>{trip.provinceEnd || ""}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => onChooseTrip(index)} className="btn-choose">Choose a trip</button>
                                        </div>
                                    </div>
                                    <div className="car__service">
                                        <div>
                                            <i>
                                                <FontAwesomeIcon icon={['fas', 'snowflake']} />
                                            </i>
                                            <p>A/C</p>
                                        </div>
                                        <div>
                                            <p>|</p>
                                        </div>
                                        <div>
                                            <i>
                                                <FontAwesomeIcon icon={['fas', 'wifi']} />
                                            </i>
                                            <p>Wifi</p>
                                        </div>
                                        <div>
                                            <p>|</p>
                                        </div>
                                        <div>
                                            <i>
                                                <FontAwesomeIcon icon={['fas', 'charging-station']} />
                                            </i>
                                            <p>Charging Plug</p>
                                        </div>
                                        <div>
                                            <p>|</p>
                                        </div>
                                        <div>
                                            <i>
                                                <FontAwesomeIcon icon={['fas', 'chair']} />
                                            </i>
                                            <p>25 Empty Seat</p>
                                        </div>
                                    </div>

                                    <div style={{ display: index === position ? 'block' : 'none' }} className='seat-map'>
                                        <SelectSeat></SelectSeat>
                                    </div>
                                </div>
                            )) : ''}
                        </div>
                    ) : (<h4>No trips found</h4>)}
                </div>
            </div>
        </div>
    )
}