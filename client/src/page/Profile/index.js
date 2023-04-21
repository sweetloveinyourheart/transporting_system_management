import { Avatar, Layout, Menu, theme } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import './style.css';
import { React, useState } from 'react';
import Infor from './Infor';
import ChangePassword from './ChangePassword';

const { Content, Sider } = Layout;

function Profile() {
    const [currentPage, setCurrentPage] = useState('profile');
    const handleProfileClick = () => {
        setCurrentPage('profile');
    };
    const handleChangePasswordClick = () => {
        setCurrentPage('change-password');
    };
    return (
        <Layout className='profile-container'>
            <Sider>
                <Menu mode="inline" className='menu' selectedKeys={[currentPage]}>
                    <Menu.Item disabled="true" key="avatar" >
                        <Avatar size="small" icon={<UserOutlined />} />
                    </Menu.Item>
                    <Menu.Item key="profile" icon={<UserOutlined />} onClick={handleProfileClick}>
                        Profile
                    </Menu.Item>
                    <Menu.Item key="change-password" icon={<UnlockOutlined />} onClick={handleChangePasswordClick}>
                        Change Password
                    </Menu.Item>
                </Menu>
            </Sider>
            <Content className='profile-content'>
                {currentPage === 'profile' && <Infor />}
                {currentPage === 'change-password' && <ChangePassword />}
            </Content>
        </Layout>
    );
}

export default Profile;