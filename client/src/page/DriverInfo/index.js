import { memo } from "react";
import { useAuth } from "../../contexts/auth";

function DriverInfo(){
    const { user } = useAuth();

    return <div className="mx-12 w-full">
        <h1 className="font-bold text-xl pb-2">Driver Information</h1>
        {/* simple info */}
        <div className="flex p-3 border my-3">
            <img alt="error" src="https://i.pravatar.cc/300"
                className="w-20 rounded-full"/>
            <ul className="flex flex-col ml-3 w-full">
                <li>
                    <span className="font-bold text-lg">Nguyen Van A</span>
                </li>
                <li>
                    <span className="mr-3 opacity-60">Date in: 7/4/2023</span>
                    <span className="opacity-60">Update at: 9:53AM 7/4/2023</span>
                </li>
                <li>
                    <span className="opacity-60">Trip: 5</span>
                </li>
            </ul>
        </div>
        {/* detail info */}
        <div className="flex flex-col p-3 border my-3">
            <h1 className="font-bold text-lg">Information</h1>
            <ul className="flex flex-wrap w-full">
                <li className="flex flex-col w-1/2 p-3">
                    <span className="opacity-60">Full name</span>
                    <span className="font-medium">Nguyen Van A</span>
                </li>
                <li className="flex flex-col w-1/2 p-3">
                    <span className="opacity-60">Phone</span>
                    <span className="font-medium">45641345456</span>
                </li>
                <li className="flex flex-col w-1/2 p-3">
                    <span className="opacity-60">Address</span>
                    <span className="font-medium">Quy Nhon</span>
                </li>
                <li className="flex flex-col w-1/2 p-3">
                    <span className="opacity-60">Email</span>
                    <span className="font-medium">NguyenA@gmail.com</span>
                </li>
            </ul>
        </div>
    </div>
}

export default memo(DriverInfo);