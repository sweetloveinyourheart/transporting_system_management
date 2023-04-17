import React from 'react';
import './style.css'
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';

export default function MySchedulePage() {

    //Table content
    const getItems = (title, dataIndex, key, render) => {
        return { title, dataIndex, key, render };
    }

    //Expend Row
    const expandedRowRender = () => {
        const columns = [
            getItems('Date', 'date', 'date'),
            getItems('Name', 'name', 'name'),
            getItems('Status', '', 'state', () => <Badge status="success" text="Finished" />),
            getItems('Upgrade Status', 'upgradeNum', 'upgradeNum'),
            getItems('Action', 'operation', 'operation', () => (
                <Space size="middle">
                    <a>Pause</a>
                    <a>Stop</a>
                    {/* <Dropdown
                        menu={{
                            items: [
                                {
                                    key: '1',
                                    label: 'Action 1',
                                },
                                {
                                    key: '2',
                                    label: 'Action 2',
                                },
                            ]
                        }}
                    >
                        <a>
                            More <DownOutlined />
                        </a>
                    </Dropdown> */}
                </Space>
            ),),
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                date: '2014-12-24',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
        getItems('Car number', 'carNumber', 'name'),
        getItems('Create at', 'createAt', 'platform'),
        getItems('Province start', 'provinceStart', 'version'),
        getItems('Province end', 'provinceEnd', 'upgradeNum'),
        getItems('Status', 'state', 'creator'),
        getItems('Time start', 'timeStart', 'createdAt'),
        getItems('Action', '', 'operation', () => <a>Publish</a>),
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i.toString(),
            carNumber: 'ABC-123456',
            createAt: '2014-12-24',
            provinceStart: 'Quy Nhon',
            provinceEnd: 'TP.HCM',
            state: <Badge status="success" text="Finished" />,
            timeStart: '2014-12-24',
        });
    }

    return (
        <Table
            style={{ marginLeft: "50px" }}
            columns={columns}
            expandable={{
                expandedRowRender,
                // defaultExpandedRowKeys: ['0'],
            }}
            dataSource={data}
            pagination={{
                position: ["bottomCenter"]
            }}
        />
    )
}