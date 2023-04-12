import './css/SelectSeatPage.css'
import bookedchair from '../../assets/images/chair/BookedChair.png'
import selectedchair from '../../assets/images/chair/SelectedChair.png'
import availablechair from '../../assets/images/chair/AvailableChair.png'
import blackchair from '../../assets/images/chair/blackchair.png'
import greenchair from '../../assets/images/chair/greenchair.png'
import pinkchair from '../../assets/images/chair/pinkchair.png'


export default function SelectSeat() {
    const arr = [1, 2, 3, 4, 5];
    return (
        <div class="select-seat-page">
            <div>
                <p class="select-seat-page__title">Select The Seats</p>
            </div>
            <div class="seat-info">
                <div class="seat-info__img">
                    <img src={selectedchair} alt="" />
                    <img src={availablechair} alt="" />
                    <img src={bookedchair} alt="" />
                </div>
            </div>
            <div class="seat-map">
                <div className='seat-map__desk-title'>
                    <p>Upper Desk</p>
                    <p>Lower Desk</p>
                </div>
                <div class="seat-map__position">
                    {/* position chair for each column */}
                    {arr.map(item => (
                        item % 2 === 1 ? (
                            <div>
                                <img src={blackchair} alt="" />
                                <img src={blackchair} alt="" />
                                <img src={greenchair} alt="" />
                                <img src={blackchair} alt="" />
                                <img src={pinkchair} alt="" />
                                <img src={greenchair} alt="" />
                                <img src={pinkchair} alt="" />
                            </div>
                        )
                            :
                            (
                                <div>
                                    <img src={blackchair} alt="" />
                                </div>
                            )
                    ))}
                    <div style={{
                        fontSize: "100px",
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 100,
                        color: '#5669FF'
                    }}>|</div>
                    {arr.map(item => (
                        item % 2 === 1 ? (
                            <div>
                                <img src={blackchair} alt="" />
                                <img src={blackchair} alt="" />
                                <img src={greenchair} alt="" />
                                <img src={blackchair} alt="" />
                                <img src={pinkchair} alt="" />
                                <img src={greenchair} alt="" />
                                <img src={pinkchair} alt="" />
                            </div>
                        )
                            :
                            (
                                <div>
                                    <img src={blackchair} alt="" />
                                </div>
                            )
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div>
                    <p >Số ghế: 5, 13</p>
                </div>
                <div>
                    <button className="btn-choose">Continue</button>
                </div>
            </div>
        </div>
    )
}