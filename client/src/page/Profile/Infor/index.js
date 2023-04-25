import { React, useState, useEffect } from 'react';
import { Layout, Card, Avatar, Button, Typography } from 'antd';
import { UserOutlined, EditFilled } from '@ant-design/icons';
import './style.css'
import { getUser } from '../../../services/account';
import ModalForm from './ModalForm.js';

const { Content } = Layout;
function Infor() {
	const [infor, setInfor] = useState();
	const [showEditModal, setShowEditModal] = useState(false);
	const { user, role } = infor || {};
	useEffect(() => {
		const fetchUser = async () => {
			const users = await getUser();
			setInfor(users);
		};
		fetchUser();
	}, [showEditModal]);
	const handleEditProfile = () => {
		setShowEditModal(true);
	}

	const handleCancelEditProfile = () => {
		setShowEditModal(false);
	}
	const handleSaveProfile = (values) => {
		setInfor(values);
		setShowEditModal(false);
	}
	return (

		<div className='flex flex-col justify-center items-start h-auto personal-infor'
		// className="flex flex-col justify-start items-start h-auto "
		>
			<Typography.Title className="title my-5 text-center">Person Information</Typography.Title>
			<div
				className="shadow-md rounded-lg detail-infor"
			>
				<Card
				// title="Person Information"
				>
					<Avatar className='flex justify-center text-center' size={120} icon={<UserOutlined />} />
					<div className='mt-5' >
						<p className="mb-2 detail"><strong>Fullname:</strong>  {user ? user.fullName : ""}</p>
						<p className="mb-2 detail"><strong>Phone number:</strong> {user ? user.phoneNumber : ""}</p>
						<p className="mb-2 detail"><strong>Email:</strong> {user ? user.email : ""}</p>
						<p className="mb-2 detail"><strong>Address:</strong> {user ? user.address : ""}</p>
						{role && (role.name === 'ROLE_DRIVER' || role.name === 'ROLE_EMPLOYEE') ? (
							<>
								<p className="mb-2"><strong>Birth:</strong> {user?.employeeDTO?.dob ? new Date(user.employeeDTO.dob).toLocaleDateString() : ""}</p>
								<p className="mb-2"><strong>Years of experience:</strong> {user?.employeeDTO?.yoe || ""} years</p>
							</>
						) : null}
					</div>
					{!((role && (role.name === 'ROLE_DRIVER' || role.name === 'ROLE_EMPLOYEE'))) && (
						<div className='mt-3'>
							<Button
								className='edit-submit'
								onClick={handleEditProfile}
							>
								Edit
							</Button>
						</div>)}
				</Card>
				<ModalForm visible={showEditModal} onCancel={handleCancelEditProfile} userData={infor} onSave={handleSaveProfile} ></ModalForm>
			</div>
		</div>

	);
}

export default Infor;