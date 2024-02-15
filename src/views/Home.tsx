import { useState, useEffect, ChangeEvent } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';



type HomeProps = {
    isLoggedIn:boolean,
    currentUser: UserType|null,
    flashMessage: (message:string, category:CategoryType) => void
}


export default function Home({ isLoggedIn, currentUser, flashMessage }: HomeProps) {
    const [user, setUser] = useState<UserType[]>([]);
    const [newUser, setNewUser] = useState<PostFormDataType>({title: '', body: ''})
    const [displayForm, setDisplayForm] = useState(false);
    const [fetchSignData, setFetchSignData] = useState(true)

    useEffect( () => {
        async function fetchData(){
            const response = await getAllSign();
            console.log(response);
            if (response.data){
                let posts = response.data;
                Sign.sort( (a, b) => (new Date(a.dateCreated) > new Date(b.dateCreated)) ? -1 : 1)
                setSign(sign)
            }
        }

        fetchData();
    }, [fetchSignData] )

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.value, event.target.name);
        setNewSign({...newPost, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const token = localStorage.getItem('token') || '';
        const response = await createSign(token, newUser);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`${response.data?.title} has been created`, 'success');
            setNewSign({title:'', body:''})
            setDisplayForm(false);
            setFetchSignData(!fetchSignData);
        }

    }



    return (
        <Container fluid>
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


