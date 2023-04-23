import Sider from 'antd/es/layout/Sider';
import { Menu } from 'antd';
import { CoffeeOutlined, UserOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import MySchedulePage from '../MySchedule';
import LeaveTool from '../LeaveTool';
import RequestForm from '../LeaveTool/RequestForm';
import DriverInfo from '../DriverInfo';

function DriverPage() {
    const location = useLocation();
    const navigate = useNavigate();
    //Menu items
    function getItemMenu(label, key, icon, children, type) {
        return { label, key, icon, children, type }
    }

    const items2 = [
        getItemMenu('My Information', 'my-information', <UserOutlined />),
        getItemMenu('My Schedule', 'my-schedule', <ScheduleOutlined />),
        getItemMenu('My Leave', 'my-leave', <CoffeeOutlined />),
    ];

    return (
        <div className='my-schedule-page'>
            <Sider>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[location.pathname.split("/")[2]]}
                    defaultOpenKeys={[location.pathname.split("/")[2]]}
                    style={{ height: '100%', borderRight: 0 }}
                    items={items2}
                    onSelect={(item) => {
                        navigate(item.key);
                    }}
                />
            </Sider>
            <Routes>
                <Route path='my-information' element={<DriverInfo />} />
                <Route path='my-schedule' element={<MySchedulePage />} />
                <Route path='my-leave' element={<LeaveTool />} />
                <Route path='my-leave/request' element={<RequestForm />} />
            </Routes>
        </div>
    );
}

export default DriverPage;