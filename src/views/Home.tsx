import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Carousel from '../components/Carousel';

export default function Home() {


    return (
        <Container fluid>
            <Carousel/>
            <br/>
            <h2 className="text-center">Astrology Signs</h2> 
            <Row xs={1} md={4} style={{paddingTop: '2rem', paddingBottom: '2rem'}} className="g-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <Col key={idx}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={`../../public/images/${["Aries", "Taurus", "Gemini", "Cancer"][idx]}.png`} />
                            <Card.Body>
                                <Card.Title>{["Aries", "Taurus", "Gemini", "Cancer"][idx]}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row xs={1} md={4} style={{paddingTop: '2rem', paddingBottom: '2rem'}} className="g-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <Col key={idx}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={`../../public/images/${["Leo", "Virgo", "Libra", "Scorpio"][idx]}.png`} />
                            <Card.Body>
                                <Card.Title>{["Leo", "Virgo", "Libra", "Scorpio"][idx]}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row xs={1} md={4} style={{paddingTop: '2rem', paddingBottom: '2rem'}} className="g-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <Col key={idx}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={`../../public/images/${["Sagittarius", "Capricorn", "Aquarius", "Picses"][idx]}.png`} />
                            <Card.Body>
                                <Card.Title>{["Sagittarius", "Capricorn", "Aquarius", "Picses"][idx]}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}


