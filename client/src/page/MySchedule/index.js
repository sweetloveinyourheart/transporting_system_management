import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth'
import './style.css'
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { getSchedule } from '../../services/schedule';
import { getCurrentDate } from '../../utils/dateTime';

export default function MySchedulePage() {
    const [loading, setLoading] = useState(false);
    const [schedule, setSchedules] = useState([]);

    const date = getCurrentDate();

    const { accessToken } = useAuth();


    //Get schedule of driver
    useEffect(() => {
        setLoading(true);
        getSchedule(accessToken).then(res => {
            setSchedules(res);
            setLoading(false);
        })
    }, [])

    //Table content
    const getItems = (title, dataIndex, key, render) => {
        return { title, dataIndex, key, render };
    }

    //Table column
    const columns = [
        getItems('Trip number', 'tripNumber', 'tripNumber'),
        getItems('Car number', 'carNumber', 'carNumber'),
        getItems('Province start', 'provinceStart', 'provinceStart'),
        getItems('Province end', 'provinceEnd', 'provinceEnd'),
        getItems('Pickup Location', 'pickupLocation', 'pickupLocation'),
        getItems('Drop off location', 'dropOffLocation', 'dropOffLocation'),
        getItems('Status', 'state', 'state'),
        getItems('Time start', 'timeStart', 'timeStart'),
        getItems('Action', '', 'action', () => <a>Finish</a>),
    ];

    const data = [];
    for (let i = 0; i < schedule.trip?.length; ++i) {
        data.push({
            key: schedule.trip[i].tripId,
            tripNumber: i + 1,
            carNumber: schedule.car.carNumber,//
            provinceStart: schedule.trip[i].provinceStart,
            provinceEnd: schedule.trip[i].provinceEnd,
            pickupLocation: schedule.trip[i].pickupLocation,
            dropOffLocation: schedule.trip[i].dropOffLocation,
            state: schedule.trip[i].timeStart < date ? <Badge status="success" text="Finished" />
                : <Badge status="processing" text="Coming" />,
            timeStart: schedule.trip[i].timeStart.substring(0, 11),
        });
    }

    return (
        <Table
            loading={loading}
            style={{ marginLeft: "50px" }}
            columns={columns}
            dataSource={data}
            pagination={{
                pageSize: 5,
                position: ["bottomCenter"]
            }}
        />
    )
}