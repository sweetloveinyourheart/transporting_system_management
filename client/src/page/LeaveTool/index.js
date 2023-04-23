import { Table, Badge } from "antd";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLeave, updateCurrentPage } from "../../feature/leave/leaveSlice";

function LeavePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const leaves = useSelector(state => state.leave.leaves);
    const totalLeave = useSelector(state => state.leave.totalLeave);
    const currentPage = useSelector(state => state.leave.currentPage);
    const [loadingPage, setLoadingPage] = useState(true);

    //get all leave by user id
    useEffect(() => {
        setLoadingPage(true);
        dispatch(fetchAllLeave({
            currentPage,
            onComplete: () => {
                setLoadingPage(false);
            }
        }));
    }, [dispatch, currentPage])

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
        <div className="ml-12 flex items-center justify-center w-full">
            <div className="flex">
                <Table
                    columns={columns}
                    loading={loadingPage}
                    pagination={{
                        position: ["bottomCenter"],
                        pageSize: 5,
                        total: totalLeave,
                        current: currentPage + 1,
                        onChange: (page) => {
                            dispatch(updateCurrentPage(page - 1));
                        }
                    }}
                    dataSource={leaves.map((leave, i) => {
                        return {
                            key: leave.leaveId,
                            index: (currentPage * 5) + i + 1,
                            startDate: leave.dateStart,
                            endDate: leave.dateEnd,
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
            </div>
        </div>
    );
}

export default memo(LeavePage);