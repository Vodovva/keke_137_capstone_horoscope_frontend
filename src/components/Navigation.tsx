
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';


interface NavigationProps {
    isLoggedIn: boolean;
    handleClick: () => void;
}


export default function Navigation ({ isLoggedIn, handleClick }:NavigationProps) {
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
                                <Nav.Link as={Link} to='/login' onClick={handleClick}>Login</Nav.Link>
                                <Nav.Link as={Link} to='/signup' onClick={handleClick}>Sign Up</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to='/signup'>Sign In</Nav.Link>
                                <Nav.Link as={Link} to='/login'>Log In</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};


