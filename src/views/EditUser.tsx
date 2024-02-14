import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserId, editUserId, deleteUserId } from '../lib/apiWrapper';
import { CategoryType, UserType, UserFormDataType } from '../types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
// import Logout from '../lib/apiWrapper'

type EditUserProps = {
    currentUser: UserType|null,
    flashMessage: (message: string, category:CategoryType) => void;
    logUserOut: () => void;
}

export default function EditUser({ currentUser, flashMessage, logUserOut }: EditUserProps) {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [userToEditData, setUserToEditData] = useState<Partial<UserFormDataType>>({username:'', email:'' })
    // const [showModal, setShowModal] = useState(false);

    // const openModal = () => setShowModal(true);
    // const closeModal = () => setShowModal(false);

    useEffect( () => {
        async function getUser(){
            let response = await getUserId(userId!);
            if (response.error){
                flashMessage(response.error, 'danger');
                navigate('/')
            } else if (response.data) {
                const userToEdit = response.data
                if (userToEdit.id !== currentUser?.id){
                    flashMessage('You do not have permission to edit this user', 'danger');
                    navigate('/')
                } else {
                    setUserToEditData({ username: userToEdit.username, email: userToEdit.email})
                }
            }
        }
        getUser();
    }, [ userId ] );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserToEditData({...userToEditData, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editUserId(token, userId!, userToEditData);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`User has been updated`, 'success');
            navigate('/')
        }
    }

    const handleDeleteClick = async () => {
        const token = localStorage.getItem('token') || ''
        const response = await deleteUserId(token, userId!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(response.data!, 'primary')
            logUserOut()
            navigate('/')
        }
    }

    return (
        <>
            <h1 className="text-center">User Profile</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control name='username' value={userToEditData.username} onChange={handleInputChange} />
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' value={userToEditData.email} onChange={handleInputChange} />
                        <Button variant='success' className='mt-3 w-50' type='submit'>Update User Profile</Button>
                        <Button variant='danger' className='mt-3 w-50' onClick={handleDeleteClick}>Delete Profile</Button>
                    </Form>
                </Card.Body>
            </Card>

            {/* <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {userToEditData.username}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete {userToEditData.email}? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={closeModal}>Close</Button>
                <Button variant='danger' onClick={handleDeleteClick}>Delete Post</Button>
            </Modal.Footer>
            </Modal> */}

                    {/* <Button variant="secondary" onClick={handleLogout}>
                        Logout
                    </Button>   */}
        </>
    )
}