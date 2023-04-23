import { memo, useEffect, useRef, useState } from "react";
import penUrl from "../../assets/home/pen.png";
import { useAuth } from "../../contexts/auth";
import { message } from "antd";
import axios from "axios";
import { BASE_URL } from "../../constant/network";
import ValidateProcess from "./ValidateProcess";

function InfoEditForm({ user }){
    const [info, setInfo] = useState({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        address: user.address
    });
    const [editing, setEditing] = useState(false);
    const fullNameInputRef = useRef(null);
    const { setUser } = useAuth();
    const [infoValidate] = useState({
        fullName: [
            {
                message: "Require 5-20 characters",
                checkFunc: (v) => {
                    return /^[\p{L} ]{5,20}$/u.test(v);
                }
            }
        ],
        phoneNumber: [
            {
                message: "Require 10-11 digits",
                checkFunc: (v) => {
                    return /^[0-9]{10,11}$/.test(v);
                }
            }
        ],
        email: [
            {
                message: "Email is not valid",
                checkFunc: (v) => {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v);
                }
            }
        ]
    });
    const [infoValid, setInfoValid] = useState({
        fullName: true,
        phoneNumber: true,
        email: true
    });

    useEffect(() => {
        if(editing){
            fullNameInputRef.current.focus();
        }
    }, [editing])

    const onEditHandle = () => {
        if(!infoValid.fullName){
            message.error("Full name not valid !!!");
            return;
        }
        if(!infoValid.phoneNumber){
            message.error("Phone number not valid !!!");
            return;
        }
        if(!infoValid.email){
            message.error("Email not valid !!!");
            return;
        }
        if
        (
            info.fullName === user.fullName && 
            info.phoneNumber === user.phoneNumber &&
            info.email === user.email &&
            info.address === user.address
        ){
            message.success("No change");
            setEditing(false);
        }
        else{
            axios.put(BASE_URL + `/api/v1/users/${user.userId}`, info)
            .then((data) => {
                console.log(data);
                setUser((auth) => {
                    return {
                        ...auth,
                        user: {
                            ...auth.user,
                            ...info,
                            updatedAt: new Date().toLocaleString("sv")
                        }
                    }
                })
                message.success("Changed");
                setEditing(false);
            })
            .catch(() => {
                message.error("System is error !!!");
            })
        }
    }

    return (
        <div className="flex p-3 my-3 border items-center">
            <div className="flex flex-col">
                <h1 className="font-bold text-lg">Information</h1>
                <ul className="flex flex-wrap w-full">
                    <li className="flex flex-col w-1/2 p-3">
                        <span className="opacity-60">Full name</span>
                        <input
                            ref={fullNameInputRef}
                            className={`font-medium outline-none 
                                ${editing ? '' : 'cursor-not-allowed'}`}
                            value={info.fullName}
                            onChange={(e) => {
                                setInfo({
                                    ...info,
                                    fullName: e.target.value
                                });
                            }}
                            readOnly={!editing}
                        />
                        <ValidateProcess value={info.fullName}
                            chains={infoValidate.fullName}
                            show={editing}
                            onValidUpdate={(valid) => {
                                setInfoValid({
                                    ...infoValid,
                                    fullName: valid
                                });
                            }}
                        />
                    </li>
                    <li className="flex flex-col w-1/2 p-3">
                        <span className="opacity-60">Phone</span>
                        <input
                            className={`font-medium outline-none 
                                ${editing ? '' : 'cursor-not-allowed'}`}
                            value={info.phoneNumber}
                            onChange={(e) => {
                                setInfo({
                                    ...info,
                                    phoneNumber: e.target.value
                                });
                            }}
                            readOnly={!editing}
                        />
                        <ValidateProcess value={info.phoneNumber}
                            chains={infoValidate.phoneNumber}
                            show={editing}
                            onValidUpdate={(valid) => {
                                setInfoValid({
                                    ...infoValid,
                                    phoneNumber: valid
                                });
                            }}
                        />
                    </li>
                    <li className="flex flex-col w-1/2 p-3">
                        <span className="opacity-60">Address</span>
                        <input
                            className={`font-medium outline-none 
                                ${editing ? '' : 'cursor-not-allowed'}`}
                            value={info.address}
                            onChange={(e) => {
                                setInfo({
                                    ...info,
                                    address: e.target.value
                                });
                            }}
                            readOnly={!editing}
                        />
                    </li>
                    <li className="flex flex-col w-1/2 p-3">
                        <span className="opacity-60">Email</span>
                        <input
                            className={`font-medium outline-none 
                                ${editing ? '' : 'cursor-not-allowed'}`}
                            value={info.email}
                            onChange={(e) => {
                                setInfo({
                                    ...info,
                                    email: e.target.value
                                });
                            }}
                            readOnly={!editing}
                        />
                        <ValidateProcess value={info.email}
                            chains={infoValidate.email}
                            show={editing}
                            onValidUpdate={(valid) => {
                                setInfoValid({
                                    ...infoValid,
                                    email: valid
                                });
                            }}
                        />
                    </li>
                </ul>
            </div>
            {
                !editing ?
                <button className="border min-w-fit flex items-center px-2 py-1 rounded-full
                hover:border-main-blue transition"
                    onClick={() => {
                        setEditing(true);
                    }}>
                    <span className="mr-1 opacity-60 font-medium text-sm">Edit</span>
                    <img alt="error" src={penUrl}
                        className="w-4"/>
                </button>
                :
                <button className="border min-w-fit flex items-center px-2 py-1 rounded-full
                hover:border-main-blue transition"
                    onClick={() => {
                        onEditHandle();
                    }}>
                    <span className="mr-1 opacity-60 font-medium text-sm">Confirm</span>
                </button>
            }
        </div>
    );
}

export default memo(InfoEditForm);