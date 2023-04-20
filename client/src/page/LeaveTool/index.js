import { Table, Badge } from "antd";
import { memo, useEffect, useState } from "react";
import { useAuth } from '../../contexts/auth'
import { useNavigate } from "react-router-dom";
import { getLeave } from "../../services/leave";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLeave } from "../../feature/leave/leaveSlice";

function LeavePage() {
    const [allLeave, setAllLeave] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const leaves = useSelector(state => state.leave.leaves);

    //get all leave by user id
    useEffect(() => {
        dispatch(fetchAllLeave());
    }, [])

    const columns = [
        {
            title: "Index",
            key: "index",
            dataIndex: "index"
        },
        {
            title: "Start date",
            key: "startDate",
            dataIndex: "startDate"
        },
        {
            title: "End date",
            key: "endDate",
            dataIndex: "endDate"
        },
        {
            title: "Reason",
            key: "reason",
            dataIndex: "reason"
        },
        {
            title: "Approved",
            key: "approved",
            dataIndex: "approved"
        }
    ];

    return (
        <>
            <Table
                style={{ marginLeft: "50px" }}
                columns={columns}
                pagination={{
                    position: ["bottomCenter"]
                }}
                dataSource={leaves.map((leave, i) => {
                    return {
                        key: leave.leaveId,
                        index: i + 1,
                        startDate: leave.dateStart,
                        endDate: leave.dateEnd.substring(0, 10),
                        reason: leave.reason,
                        approved: leave.approved ? <Badge status="success" text="Approved" /> : <Badge status="error" text="Not Approved" />,
                    };
                })}
            />
            <div className="mb-2 min-w-fit mx-5">
                <button className="bg-main-blue text-white p-2 rounded hover:bg-dark-blue transition"
                    onClick={() => {
                        navigate("request");
                    }}>
                    Request leave
                </button>
            </div>
        </>
    );
}

export default memo(LeavePage);