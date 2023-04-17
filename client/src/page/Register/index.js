// import React, { useState } from 'react';
import './style.css';
import { Form, Input, Button, Typography, message } from 'antd';
import { LockFilled, UserOutlined, RightCircleFilled, MailFilled, PhoneFilled, EnvironmentFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Register(props) {
	const [form] = Form.useForm();

	const navigate = useNavigate();

	const handleSubmit = async (value) => {
		const result = await register(value.username, value.password, value.fullname, value.phoneNumber, value.email, value.address)
		if (!result) {
			message.error("register fail!")
			return;
		}

		message.success("register success!")
		navigate('/login');
	}
	const validateFullname = (_, value) => {
		const trimmedValue = value.trim();
		const words = trimmedValue.split(' ');
		const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

		if (words.length > 6 || /\s\s/.test(value)) {
			return Promise.reject(new Error('Fullname must start with uppercase and have no more than 2 spaces'));
		}
		const formattedValue = formattedWords.join(' ');
		if (trimmedValue !== formattedValue) {
			return Promise.reject(new Error('Fullname must start with uppercase and have no space'));
		}

		if (/\d/.test(trimmedValue)) {
			return Promise.reject(new Error('Fullname cannot contain numbers'));
		}

		return Promise.resolve();
	}
	const validateUserName = (_, value) => {
		const trimmedValue = value.trim();
		const words = trimmedValue.split(' ');
		if (words.length > 1 || /\s\s/.test(value)) {
			return Promise.reject(new Error('UserName have no spaces'));
		}
		return Promise.resolve();
	}
	const validateAddress = (_, value) => {
		const trimmedValue = value.trim();
		const words = trimmedValue.split(' ');
		if (/\s\s/.test(value)) {
			return Promise.reject(new Error('Adress have no spaces'));
		}
		return Promise.resolve();
	}
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
			<Typography.Title className='title'>Register</Typography.Title>
			<Form form={form} className='registerForm' onFinish={handleSubmit}>
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
					{
						validator: validateFullname
					}
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
						validator: validateUserName
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
						message: 'Please input your email!'
					},
					{
						max: 50,
						message: 'Email cannot be longer than 50 characters'
					},
					{
						type: 'email', message: 'Please enter a valid email'
					},
					]}
					name={'email'}
					hasFeedback>
					<Input className='input' prefix={<MailFilled className="site-form-item-icon" />} placeholder='Enter email' />
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
						validator: validateAddress
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
					name={'phoneNumber'}
					hasFeedback>
					<Input className='input' onBeforeInput={onKeyPhoneNumber} prefix={<PhoneFilled className="site-form-item-icon" />} placeholder='Enter Phone' maxLength={11} />
				</Form.Item>
				<Form.Item className='form-item-register'>
					<div className='wrap-btn'>
						<button className='btn-register' htmlType='submit'>REGISTER </button>
						<i className='arrow-icon'>
							<FontAwesomeIcon icon={faArrowRight} />
						</i>
					</div>
					<div className='to-login' style={{ marginTop: "10px" }}>
						<span style={{ fontWeight: '700' }}>
							Already have an account?
						</span>
						<Link style={{ fontWeight: '700' }} to='/login'>Login</Link>
					</div>
				</Form.Item>
			</Form>

		</div>
	);
}

export default Register;