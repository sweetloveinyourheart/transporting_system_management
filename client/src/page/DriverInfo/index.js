import { memo } from "react";
import { useAuth } from "../../contexts/auth";
import InfoEditForm from "./InfoEditForm";

function DriverInfo(){
    const { user } = useAuth();

    if(!user || !user.user){
        return (<div>Loading...</div>);
    }

    return (
        <div className="mx-12 w-full">
            <h1 className="font-bold text-xl pb-2">Driver Information</h1>
            {/* simple info */}
            <div className="flex p-3 border my-3">
                <img alt="error" src="https://i.pravatar.cc/300"
                    className="w-20 rounded-full"/>
                <ul className="flex flex-col ml-3 w-full">
                    <li>
                        <span className="font-bold text-lg">{user.user.fullName}</span>
                    </li>
                    <li>
                        <span className="mr-3 opacity-60">Date in: {user.user.createdAt}</span>
                        <span className="opacity-60">
                            {
                                user.user.updatedAt &&
                                `Update at: ${user.user.updatedAt}`
                            }
                        </span>
                    </li>
                    <li>
                        <span className="opacity-60">You are Driver</span>
                    </li>
                </ul>
            </div>
            <InfoEditForm user={user.user}/>
        </div>
    );
}

export default memo(DriverInfo);