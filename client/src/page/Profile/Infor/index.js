import { React, useState, useEffect } from 'react';
import { Layout, Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './style.css'
import { getUser } from '../../../services/account';
const { Content } = Layout;
function Infor() {
    const [user, setUsers] = useState();
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            setUsers(user);
        };
        fetchUser();
    }, []);
    return (
        <Layout className='container-info'>
            <Content className='content-info'>
                <div className='avatar-info'>
                    <Card title="Avatar">
                        <Avatar size={128} icon={<UserOutlined />} />
                    </Card>
                </div>
                <div className='text-info'>
                    <Card title="Person Information">
                        <div className="flex justify-between my-5 px-6">
                            <div className="w-full md:w-1/2">
                                <p className="mb-2">Fullname:  {user ? user.user.fullName : ""}</p>
                                <p className="mb-2">Phone number: {user ? user.user.phoneNumber : ""}</p>
                                <p className="mb-2">Email: {user ? user.user.email : ""}</p>
                                <p className="mb-2">Address: {user ? user.user.address : ""}</p>
                            </div>
                            {user && user.role && (user.role.name === 'ROLE_DRIVER' || user.role.name === 'ROLE_EMPLOYEE') ? (
                                <div className="w-full md:w-1/2">
                                    <p className="mb-2">Birth: {user ? new Date(user.user.employeeDTO.dob).toLocaleDateString() : ""}</p>
                                    <p className="mb-2">Years of experience: {user ? user.user.employeeDTO.yoe : ""} years</p>
                                </div>
                            ) : null}
                        </div>
                    </Card>
                </div>
            </Content>
        </Layout>
    );
}

export default Infor;