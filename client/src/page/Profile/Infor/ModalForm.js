import React, { useEffect, useState } from 'react';
import { LockFilled, UserOutlined, RightCircleFilled, MailFilled, PhoneFilled, EnvironmentFilled } from '@ant-design/icons';
import {
    Modal,
    Form,
    Input,
    Button,
    message
} from 'antd';
import { editProfile } from '../../../services/account';

function ModalForm(props) {
    const [form] = Form.useForm();
    const { visible, onCancel, userData } = props;
    const { user } = userData || {};
    useEffect(() => {
        form.setFieldsValue(user);
    }, [user, form]);
    const handleSaveProfile = async (values) => {
        const result = await editProfile(user.userId, values.fullName,
            values.phoneNumber,
            values.email,
            values.address)

        if (!result) {
            message.error("Edit faild");
            return
        }
        message.success("Edit Sucess")
        onCancel();
    };
    // validatefullname
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
    //validate address
    const validateAddress = (_, value) => {
        const trimmedValue = value.trim();
        const words = trimmedValue.split(' ');
        if (/\s\s/.test(value)) {
            return Promise.reject(new Error('Adress have no spaces'));
        }
        return Promise.resolve();
    }
    //phone number
    const onKeyPhoneNumber = (e) => {
        const pattern = /^[0-9+]+$/;
        if (!pattern.test(e.data)) {
            e.preventDefault();
        }
    }
    return (
        <>
            <Modal
                title="Edit Information"
                onCancel={onCancel}
                open={visible}
                footer={null}>
                <Form
                    initialValues={user}
                    onFinish={handleSaveProfile}
                    form={form}
                    labelAlign='left'
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}>
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
                        label="Fullname" name='fullName'
                        hasFeedback>
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item label="Phone number" name='phoneNumber'
                        rules={[{

                            required: true,
                            message: 'Please input your phonenumber',

                        },
                        { min: 10, message: 'Phone number must be at least 10 digits long' },
                        { max: 11, message: 'Phone number cannot be longer than 12 digits' }]}
                        hasFeedback
                    >
                        <Input prefix={<PhoneFilled />} onBeforeInput={onKeyPhoneNumber} />
                    </Form.Item>
                    <Form.Item label="Email" name='email'
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
                        ]} hasFeedback>
                        <Input prefix={<MailFilled />} />
                    </Form.Item>
                    <Form.Item label="Address" name='address'
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
                        ]} hasFeedback>
                        <Input prefix={<EnvironmentFilled />} />
                    </Form.Item>
                    <Form.Item>
                        <Button className='bg-blue-700 hover:bg-blue-500 text-white font-bold rounded text-center' type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal >
        </>
    );
}

export default ModalForm;