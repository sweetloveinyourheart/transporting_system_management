import { Table, Badge } from "antd";
import { memo, useEffect, useState } from "react";
import { useAuth } from '../../contexts/auth'
import { useNavigate } from "react-router-dom";
import { getLeave } from "../../services/leave";


function LeavePage() {
    const [allLeave, setAllLeave] = useState([]);
    const navigate = useNavigate();

    const { user, accessToken } = useAuth();

    //get all leave by user id
    useEffect(() => {
        getLeave(user.user.userId, accessToken).then(res => {
            setAllLeave(res.content);
        });
    }, [])

    const getItems = (title, key, dataIndex) => {
        return { title, key, dataIndex }
    }

    const columns = [
        getItems("Index", "index", "index"),
        getItems("Create at", "createAt", "createAt"),
        getItems("Start date", "startDate", "startDate"),
        getItems("End date", "endDate", "endDate"),
        getItems("Reason", "reason", "reason"),
        getItems("Approved", "approved", "approved")
    ]

    const data = [];
    for (let i = 0; i < allLeave?.length; ++i) {
        data.push({
            key: i.toString(),
            index: i + 1,
            createAt: allLeave[i].createdAt.substring(0, 10),
            startDate: allLeave[i].dateStart,
            endDate: allLeave[i].dateEnd.substring(0, 10),
            reason: allLeave[i].reason,
            approved: <Badge status="success" text="Approved" />,
        });
    }


    // const columns = [
    //     {
    //         title: "Index",
    //         key: "index",
    //         dataIndex: "index"
    //     },
    //     {
    //         title: "Start date",
    //         key: "startDate",
    //         dataIndex: "startDate"
    //     },
    //     {
    //         title: "End date",
    //         key: "endDate",
    //         dataIndex: "endDate"
    //     },
    //     {
    //         title: "Reason",
    //         key: "reason",
    //         dataIndex: "reason"
    //     }
    // ];

    return (
        <>
            <Table
                style={{ marginLeft: "50px" }}
                columns={columns}
                dataSource={data}
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