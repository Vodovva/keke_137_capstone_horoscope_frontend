import { Container, Row, Col } from 'react-bootstrap';


export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-4">
            <Container fluid>
                <Row>
                    <Col className="text-center py-3">
                        © {new Date().getFullYear()} By Valerie McCray Vodovnik. All Rights Reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};