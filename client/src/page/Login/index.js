import React, { useEffect } from 'react';
import './style.css';
import { Form, Input, Typography } from 'antd';
import { LockFilled, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Login() {
	const [form] = Form.useForm();

	const { signIn, user } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if(user) {
			navigate('/')
		}
	}, [user])

	const handleSubmit = async (value) => {
		await signIn(value.username, value.password)
	}
	return (
		<div className='appBg'>
			<Typography.Title className='title'>Login</Typography.Title>
			<Form onFinish={handleSubmit} form={form} className='loginForm' >
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
					<div className='wrap-btn'>
						<button className='btn-login' htmlType='submit'>LOGIN </button>
						<i className='arrow-icon'>
							<FontAwesomeIcon icon={faArrowRight} />
						</i>
					</div>
				</Form.Item>
				<div className='to-register'>
					<span style={{ fontWeight: '700' }}>
						Don't have an account?
					</span>
					<Link style={{ fontWeight: '700' }} to='/register'>Sign Up</Link>
				</div>
			</Form>

		</div>
	);
}

export default Login;