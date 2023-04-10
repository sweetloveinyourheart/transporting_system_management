import React from 'react';
import './style.css';
import { Form, Input, Button, Typography, message } from 'antd';
import { LockFilled, UserOutlined, RightCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function Login() {
    const [form] = Form.useForm();
    return (
        <div className='appBg'>
            <Form form={form} className='loginForm' >
                <Typography.Title>Login</Typography.Title>
                <Form.Item
                    rules={[{
                        required: true,
                        message: 'Enter Username'
                    },
                        {
                            min: 3,
                            message: 'Username must be at least 3 characters'
                        },
                        {
                            max: 50,
                            message: 'Username cannot be longer than 50 characters'
                        },
                    ]}
                    name={'username'}>
                    <Input className='input' prefix={<UserOutlined className="site-form-item-icon" />} placeholder='Enter Username' maxLength={50} />
                </Form.Item>

                <Form.Item
                    rules={[{
                        required: true,
                        message: 'Enter password'
                    },
                        {
                            min: 6,
                            message: 'Password must be at least 3 characters'
                        },
                        {
                            max: 50,
                            message: 'Password cannot be longer than 50 characters'
                        },
                    ]}
                    name={'password'}>
                    <Input.Password className='input' prefix={<LockFilled className="site-form-item-icon" />} placeholder='Enter Password' />
                </Form.Item>

                <Form.Item className='form-item-login'>
                    <Button className='btn-login' type='primary' htmlType='submit'
                        icon={<RightCircleFilled className='RightCircleFilled' />}>LOGIN</Button>
                    <br/>
                    <span style={{fontWeight: '700'}}>
                        Don't have an account? <Link to='/register'>Sign Up</Link>
                    </span>
                </Form.Item>
            </Form>

        </div>
    );
}

export default Login;