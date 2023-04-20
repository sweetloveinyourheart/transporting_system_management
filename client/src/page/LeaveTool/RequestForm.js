import { memo, useState } from "react";
import arrWhite from "../../assets/home/arrowWhite.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLeave } from "../../feature/leave/leaveSlice";
import { message } from "antd";

function RequestForm() {
    const navigate = useNavigate();
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [reason, setReason] = useState("");
    const dispatch = useDispatch();

    const onClickRequest = () => {
        if(start.getTime() >= end.getTime() - (1000 * 60 * 60)){
            message.warning("Please input time leave > 60 minus !!");
            return;
        }
        if(reason === ''){
            message.warning("Please input reason !!");
            return;
        }
        const leave = {
            dateStart: start.toLocaleString("sv"),
            dateEnd: end.toLocaleString("sv"),
            reason
        }
        dispatch(addLeave(leave));
        navigate("/driver/my-leave");
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
                    <input type="datetime-local" value={start.toLocaleString("sv")} className="my-2"
                        onChange={(e) => { setStart(new Date(e.target.value)) }}/>
                </div>
                <div>
                    <span className="font-medium mr-2">End date:</span>
                    <input type="datetime-local" value={end.toLocaleString("sv")} className="my-2"
                        onChange={(e) => { setEnd(new Date(e.target.value)) }}/>
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