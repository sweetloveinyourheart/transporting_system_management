import React from 'react';
import { Layout, Card, Avatar } from 'antd';
import { UserOutlined} from '@ant-design/icons';

import './style.css'
const { Content } = Layout;
function Infor(props) {
    return (
        <Layout className='container-info'>
            <Content className='content-info'>
                <div className='avatar-info'>
                    <Card title="Avatar">
                        <Avatar size={128} icon={<UserOutlined/>} />
                    </Card>
                </div>
                <div className='text-info'>
                    <Card title="Information">
                        <p>Fullname: Baba</p>  
                        <p>Phone number: 035357843</p>
                        <p>Email: johndoe@example.com</p>
                        <p>Address: 1234 Main Street, New York, USA</p>
                    </Card>
                    
                </div>
                {/* {role === 'driver' || role === 'employee' ? (
                     <div className='text-info'>
                    <Card title="Information">
                        <Text strong>Years of Experience:</Text>
                        <Text>{yearsOfExperience} years</Text>
                    </Card>
                </div>
                ) : null} */}
            </Content>
        </Layout>
    );
}

export default Infor;