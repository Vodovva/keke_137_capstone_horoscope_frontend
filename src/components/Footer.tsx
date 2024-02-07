import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';


export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-4">
            <Container fluid>
            <Image src="../../public/images/Logo.png" rounded className='logo_nav'/> 
                <Row>
                    <Col className="text-center py-3">
                        © {new Date().getFullYear()} By Valerie McCray Vodovnik. All Rights Reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};