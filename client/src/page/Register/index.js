import React from 'react';
import './style.css';
import { Form, Input, Button, Typography } from 'antd';
import { LockFilled, UserOutlined, RightCircleFilled, MailFilled, PhoneFilled, EnvironmentFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function Register(props) {
    const [form] = Form.useForm();

    const validatePassword = (_, value) => {
        if (!value.match(/[A-Z]/)) {
            return Promise.reject('Password must include at least one uppercase letter')
        }
        return Promise.resolve();
    }

    const validateConfirmPassword = (_, value) => {
        const passwordFieldValue = form.getFieldValue('password');
        if (!value || passwordFieldValue === value) {
            return Promise.resolve();
        }
        return Promise.reject('The two passwords that you entered does not match.');
    };
    const onKeyPhoneNumber = (e) => {
        const pattern = /^[0-9+]+$/;
        if (!pattern.test(e.data)) {
            e.preventDefault();
        }
    }

    return (
        <div className='appBg'>
            <Form form={form} className='registerForm'>
                <Typography.Title>Register</Typography.Title>
                <Form.Item
                    rules={[{
                        required: true,
                        message: 'Please input your fullname!'
                    },
                    {
                        min: 3,
                        message: 'Fullname must be at least 3 characters'
                    },
                    {
                        max: 50,
                        message: 'Fullname cannot be longer than 50 characters'
                    },
                    ]}
                    name={'fullname'}
                    hasFeedback>
                    <Input className='input' prefix={<UserOutlined />} placeholder='Enter FullName' />
                </Form.Item>
                <Form.Item
                    rules={[{
                        required: true,
                        message: 'Please input your username!'
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
                    name={'username'}
                    hasFeedback>
                    <Input className='input' prefix={<UserOutlined />} placeholder='Enter Username' />
                </Form.Item>
                <Form.Item
                    rules={[{
                        required: true,
                        message: 'Please input your password!'
                    },
                    {
                        min: 6,
                        message: 'Password must be at least 6 characters'
                    },
                    {
                        max: 50,
                        message: 'Password cannot be longer than 50 characters'
                    },
                    { validator: validatePassword }
                    ]}
                    name={'password'}
                    hasFeedback>
                    <Input.Password className='input' prefix={<LockFilled className="site-form-item-icon" />} placeholder='Enter Password' maxLength={50} />
                </Form.Item>
                <Form.Item
                    rules={[{
                        required: true,
                        message: 'Please input your confirmpassword!'
                    },
                    {
                        min: 6,
                        message: 'Confirmpassword must be at least 6 characters'
                    },
                    {
                        max: 50,
                        message: 'Confirmpassword cannot be longer than 50 characters'
                    },
                    { validator: validateConfirmPassword }
                    ]}
                    name={'confirmpassword'}
                    dependencies={['password']}
                    hasFeedback>
                    <Input.Password className='input' prefix={<LockFilled className="site-form-item-icon" />} placeholder='Confirm your Password' maxLength={50} />
                </Form.Item>

                <Form.Item
                    rules={[{
                        required: true,
                        message: 'Please input your gmail!'
                    },
                    {
                        max: 50,
                        message: 'Email cannot be longer than 50 characters'
                    },
                    {
                        type: 'email', message: 'Please enter a valid email'
                    },
                    ]}
                    name={'gmail'}
                    hasFeedback>
                    <Input className='input' prefix={<MailFilled className="site-form-item-icon" />} placeholder='Enter gmail' />
                </Form.Item>
                <Form.Item
                    rules={[{
                        required: true,
                        message: 'Please input your address!'
                    },
                    {
                        min: 5,
                        message: 'Address must be at least 6 characters'
                    },
                    {
                        max: 50,
                        message: 'Adress cannot be longer than 50 characters'
                    },
                    ]}
                    name={'address'}
                    hasFeedback>
                    <Input className='input' prefix={<EnvironmentFilled className="site-form-item-icon" />} placeholder='Enter Address' />
                </Form.Item>
                <Form.Item
                    rules={[{
                        
                        required: true,
                        message: 'Please input your phonenumber',

                    },
                    { min: 10, message: 'Phone number must be at least 10 digits long' },
                    { max: 11, message: 'Phone number cannot be longer than 12 digits' }
                    ]}
                    name={'phone_number'}
                    hasFeedback>
                    <Input className='input' onBeforeInput={onKeyPhoneNumber} prefix={<PhoneFilled className="site-form-item-icon" />} placeholder='Enter Phone' maxLength={11} />
                </Form.Item>
                <Form.Item className='form-item-register'>
                    <Button className='btn-register' type='primary' htmlType='submit'
                        icon={<RightCircleFilled className='RightCircleFilled' />}>Register</Button>
                    <br />
                    <span style={{ fontWeight: '700' }}>
                        Already have an account <Link to='/login'>Log in</Link>
                    </span>
                </Form.Item>
            </Form>

        </div>
    );
}

export default Register;