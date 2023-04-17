import { memo } from "react";
import arrWhite from "../../assets/home/arrowWhite.png";
import { useNavigate } from "react-router-dom";

function RequestForm(){
    const navigate = useNavigate();

    return (
        <div className="flex flex-col mx-12">
            <button className="bg-main-blue text-white p-2 rounded hover:bg-dark-blue transition
                w-fit flex items-center"
                onClick={() => {
                    navigate("/driver/my-leave");
                }}>
                <img src={arrWhite} alt="error" className="mr-1 rotate-180"/>
                Back
            </button>
            {/* form */}
            <div className="my-3 flex flex-col">
                <div>
                    <span className="font-medium mr-2">Start date:</span>
                    <input type="datetime-local" className="my-2"/>
                </div>
                <div>
                <span className="font-medium mr-2">End date:</span>
                    <input type="datetime-local" className="my-2"/>
                </div>
                <input placeholder="Input reason to leave..."
                    className="outline-none p-2 border rounded my-2"/>
                <button className="bg-main-blue text-white p-2 rounded hover:bg-dark-blue transition
                    w-fit ml-auto my-2">
                    Request
                </button>
            </div>
        </div>
    );
}

export default memo(RequestForm);