
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { UserType } from '../types';


interface NavigationProps {
    isLoggedIn: boolean;
    handleClick: () => void;
    loggedInUser: UserType | null
}


export default function Navigation ({ isLoggedIn, handleClick, loggedInUser }:NavigationProps) {
    return (
        <Navbar expand='lg' bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand as={Link} to='/'>Daily Horoscopes</Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Navbar.Collapse id="nav-collapse">
                    <Nav className='me-auto'>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to='/horoscope'>Check Horoscope</Nav.Link>
                                {/* <Nav.Link as={Link} to='/login'>Login</Nav.Link> */}
                                {/* <Nav.Link as={Link} to='/signup'>SignUp</Nav.Link> */}
                                <Nav.Link as={Link} to='/' onClick={handleClick}>Logout</Nav.Link>
                                <Nav.Link as={Link} to={`/edit/${loggedInUser?.id}`}>User Profile</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to='/signup'>SignUp</Nav.Link>
                                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};


