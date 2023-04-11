import { useState } from 'react';
import SelectSeatPage from './SelectSeatPage';
import './css/SelectCarPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function SelectCarPage() {
    const [position, setPosition] = useState();
    //array for map loop 3 item
    const arr = [1, 2, 3];

    const onChooseTrip = (index) => {
        setPosition(index);
        if (index === position) {
            setPosition();
        }
    }

    return (
        <div className="select-car-page">
            <div className="col">
                <p className="select-car-page__title">Select The Trip</p>
            </div>
            <div>
                <div className="col">
                    <div className="select-car-page__list">
                        {/* map to create 3 item */}
                        {arr.map((item, index) => (
                            <div key={item} className="car">
                                <div className="car__type-price">
                                    <p style={{ fontWeight: 500, fontSize: "20px" }}>A/C Sleeper</p>
                                    <p style={{ fontWeight: 500, fontSize: "15px" }}>RS. 150.000</p>
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
                                            <p>Departure Time</p>
                                            <p>Journey Time</p>
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
                                            <p>08:30 PM</p>
                                            <p>07:45 Hrs</p>
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
                                </div>
                                <div style={{ display: index === position ? 'block' : 'none' }} className='seat-map'>
                                    <SelectSeatPage></SelectSeatPage>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}