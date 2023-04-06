import React, { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { AdminContext } from './AdminContext';

const SupplierPage = () => {
	const [ adminDetail, setAdminDetail ] = useContext(AdminContext);

	const updateForm = (e: { target: { name: any; value: any; }; }) => {
		setAdminDetail({ ...adminDetail, [e.target.name]: e.target.value });
	};

	
	const handelAdd = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		const url = 'http://localhost:8000/admin';

		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				name: adminDetail['name'],
				email: adminDetail['email'],
				phone: adminDetail['phone'],
				company: adminDetail['company']
			})
		});

		response.json().then((response) => {
			if (response.status === 'ok') {
				alert('Admin added successfully');
			} else {
				alert('Failed to add Admin');
			}
		});
		setAdminDetail({
			name: '',
			email: '',
			phone: '',
			company: '',
			emailTitle: '',
			email_msg: ''
		});
	};

	const handleUpdate = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		const url = 'http://localhost:8000/admin/' + adminDetail['id'];

		const response = await fetch(url, {
			method: 'PUT',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				name: adminDetail['name'],
				email: adminDetail['email'],
				phone: adminDetail['phone'],
				company: adminDetail['company']
			})
		});

		response.json().then((response) => {
			if (response.status === 'ok') {
				alert('Admin updated successfully');
			} else {
				alert('Failed to updated Admin');
			}
		});
	};

	const handleDelete = () => {
		fetch('http://127.0.0.1:8000/admin/' + adminDetail['id'], {
			method: 'DELETE',
			headers: {
				accept: 'application/json'
			}
		})
			.then((resp) => {
				return resp.json();
			})
			.then(
				(result) => {
					if (result.status === 'ok') {
						setAdminDetail({
							name: '',
							email: '',
							phone: '',
							company: '',
							emailTitle: '',
                            email_msg: '',
                            id: ''
						});
						alert('Admin deleted successfully');
					} else {
						alert('Admin deletion failed');
					}
				},
				(error) => {
					console.log(error);
				}
			);
	};

	const handleEmail = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		const url = 'http://localhost:8000/email/' + adminDetail['id'];
		console.log(adminDetail['id'])

		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				message: adminDetail['email_msg'],
				subject: adminDetail['emailTitle']
			})
		});

		response.json().then((response) => {
			if (response.status === 'ok') {
				alert('Email sent successfully');
			} else {
				alert('Failed to send email');
			}
		});
		setAdminDetail({
			emailTitle: '',
			email_msg: ''
		});
	};

	return (
		<Card>
			<Card.Body>
				<Form>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							name='name'
							value={adminDetail.name}
							onChange={updateForm}
							placeholder='admin&#39;s Name'
						/>
					</Form.Group>

					<Form.Group controlId='email'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							name='email'
							value={adminDetail.email}
							onChange={updateForm}
							placeholder='Email Address'
						/>
					</Form.Group>

					<Form.Group controlId='phone'>
						<Form.Label>Phone Number</Form.Label>
						<Form.Control
							type='number'
							name='phone'
							value={adminDetail.phone}
							onChange={updateForm}
							placeholder='Phone'
						/>
					</Form.Group>

					<Form.Group controlId='company'>
						<Form.Label>Company</Form.Label>
						<Form.Control
							type='text'
							name='company'
							value={adminDetail.company}
							onChange={updateForm}
							placeholder='Company'
						/>
					</Form.Group>

					<Form.Group controlId='emailTitle'>
						<Form.Label>Email Title</Form.Label>
						<Form.Control
							type='Text'
							name='emailTitle'
							value={adminDetail.emailTitle}
							onChange={updateForm}
							placeholder='Email Title'
						/>
					</Form.Group>

					<Form.Group controlId='email_msg'>
						<Form.Label>Email Content</Form.Label>
						<Form.Control
							type='textfield'
							name='email_msg'
							value={adminDetail.email_msg}
							onChange={updateForm}
							placeholder='Email Content'
						/>
					</Form.Group>

					<Button onClick={handleUpdate} className='btn btn-outline-info m-1' variant='primary'>
						Update
					</Button>

					<Button onClick={handelAdd} className='btn btn-outline-primary m-1' variant='primary'>
						Add Admin
					</Button>

					<Button onClick={handleEmail} className='btn btn-outline-secondary m-1' variant='primary'>
						SendEmail
					</Button>

					<Button onClick={handleDelete} className='btn btn-outline-danger m-1' variant='primary'>
						Delete
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default AdminPage ;