import "./styles.css"

const Seat = ({ chair, isSelected, isSelecting, onSelectSeat }) => {
    const chairStateColor = () => {
        if (isSelected) {
            return "selecting"
        }

        if (chair?.chairExistInOrderDetail || isSelecting) {
            return "disabled"
        }

        return "active"
    }

    const handleClick = async () => {
        if (chair?.chairExistInOrderDetail || isSelecting)
            return;

        if (isSelected) {
            await onSelectSeat(null)
            return;
        }

        await onSelectSeat(chair)
    }

    return (
        <div
            className='awesome-seat'
            onClick={handleClick}
            style={{ cursor: chair?.chairExistInOrderDetail ? 'not-allowed' : 'pointer' }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={42} viewBox="0 0 42 42" className="seat" pos={5}>
                <g fill="none" fillRule="evenodd">
                    <g className={chairStateColor()}>
                        <path d="M8.625.5c-3.038 0-5.5 2.462-5.5 5.5v27.875c0 .828.672 1.5 1.5 1.5h32.75c.828 0 1.5-.672 1.5-1.5V6c0-3.038-2.462-5.5-5.5-5.5H8.625zM5.75 35.5V38c0 1.933 1.567 3.5 3.5 3.5h23.5c1.933 0 3.5-1.567 3.5-3.5v-2.5H5.75z" />
                        <rect width="5.125" height="16.5" x=".5" y="13.625" rx="2.563" />
                        <rect width="5.125" height="16.5" x="36.375" y="13.625" rx="2.563" />
                    </g>
                </g>
                <text >
                    <tspan x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="active-seat-text">
                        {chair?.chairNumber || ""}
                    </tspan>
                </text>
            </svg>

        </div>
    );
}

export default Seat;