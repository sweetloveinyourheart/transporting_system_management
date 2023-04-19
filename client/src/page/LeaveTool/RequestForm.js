import { memo, useState } from "react";
import arrWhite from "../../assets/home/arrowWhite.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLeave } from "../../feature/leave/leaveSlice";

function RequestForm() {
    const navigate = useNavigate();
    const [start, setStart] = useState(new Date().toLocaleDateString("fr-CA"));
    const [end, setEnd] = useState(new Date().toLocaleDateString("fr-CA"));
    const [reason, setReason] = useState("");
    const dispatch = useDispatch();

    const onClickRequest = () => {
        const leave = {
            dateStart: start,
            dateEnd: end,
            reason
        }
        dispatch(addLeave(leave));
    }

    return (
        <div className="flex flex-col mx-12">
            <button className="bg-main-blue text-white p-2 rounded hover:bg-dark-blue transition
                w-fit flex items-center"
                onClick={() => {
                    navigate("/driver/my-leave");
                }}>
                <img src={arrWhite} alt="error" className="mr-1 rotate-180" />
                Back
            </button>
            {/* form */}
            <div className="my-3 flex flex-col">
                <div>
                    <span className="font-medium mr-2">Start date:</span>
                    <input type="date" value={start} className="my-2"
                        onChange={(e) => { setStart(e.target.value) }}/>
                </div>
                <div>
                    <span className="font-medium mr-2">End date:</span>
                    <input type="date" value={end} className="my-2"
                        onChange={(e) => { setEnd(e.target.value) }}/>
                </div>
                <input placeholder="Input reason to leave..."
                    className="outline-none p-2 border rounded my-2" 
                    value={reason}
                    onChange={(e) => { setReason(e.target.value) }}
                />
                <button className="bg-main-blue text-white p-2 rounded hover:bg-dark-blue transition
                    w-fit ml-auto my-2"
                    onClick={onClickRequest} >
                    Request
                </button>
            </div>
        </div>
    );
}

export default memo(RequestForm);