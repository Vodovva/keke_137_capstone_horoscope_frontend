import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';
import { UserFormDataType, CategoryType } from '../types';
import { register } from '../lib/apiWrapper';


type SignUpProps = {
    flashMessage: (newMessage:string|null, newCategory:CategoryType|null)=>void
}

export default function SignUp({ flashMessage }: SignUpProps) {
    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<UserFormDataType>({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        let response = await register(userFormData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            let newUser = response.data
            flashMessage(`Congrats ${newUser?.firstName} ${newUser?.lastName}, you have signed up with the username: ${newUser?.username}`, 'success');
            navigate('/login');
        }
    }

    const disableSubmit = userFormData.password.length < 5

    return (
        <>
            <h1 className='text-center'>Register</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name='firstName' placeholder='Enter First Name' value={userFormData.firstName} onChange={handleInputChange}/>

                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name='lastName' placeholder='Enter Last Name' value={userFormData.lastName} onChange={handleInputChange}/>

                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' type='email' placeholder='Enter Email Address' value={userFormData.email} onChange={handleInputChange}/>

                        <Form.Label>Username</Form.Label>
                        <Form.Control name='username' placeholder='Enter Username' value={userFormData.username} onChange={handleInputChange}/>

                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' type='password' placeholder='Enter Password' value={userFormData.password} onChange={handleInputChange}/>
                        {disableSubmit && <Form.Text className='text-danger'>Your passwords must be at least 6 characters and match</Form.Text>}
                        <Button type='submit' variant='outline-primary' className='w-100 mt-3' disabled={disableSubmit}>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}