import { Table } from "antd";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

function LeavePage(){
    const navigate = useNavigate();

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
        }
    ];

    return (
        <>
            <Table
                style={{ marginLeft: "50px" }}
                columns={columns}
                dataSource={[
                    {
                        key: 1,
                        index: 1,
                        startDate: new Date().toLocaleString(),
                        endDate: new Date().toLocaleString(),
                        reason: "I am sick"
                    }
                ]}
                pagination={{
                    position: ["bottomCenter"]
                }}
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