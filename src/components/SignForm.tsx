import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { fetchHoroscope } from '../lib/apiWrapper';

const Horoscope: React.FC = () => {
    const [sign, setSign] = useState<string>('');
    const [day, setDay] = useState<string>('today');
    const [horoscope, setHoroscope] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = await fetchHoroscope(sign);
            setHoroscope(data.data.horoscope_data);
            setError(null);
        } catch (error) {
            setError('Failed to fetch horoscope. Please try again.');
            setHoroscope(null);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Sign</Form.Label>
                    <Form.Control as="select" value={sign} onChange={(e) => setSign(e.target.value)}>
                        <option value="">Select your sign</option>
                        <option value="aries">Aries</option>
                        <option value="taurus">Taurus</option>
                        <option value="gemini">Gemini</option>
                        <option value="cancer">Cancer</option>
                        <option value="leo">Leo</option>
                        <option value="virgo">Virgo</option>
                        <option value="libra">Libra</option>
                        <option value="scorpio">Scorpio</option>
                        <option value="sagittarius">Sagittarius</option>
                        <option value="capricorn">Capricorn</option>
                        <option value="aquarius">Aquarius</option>
                        <option value="picses">Picses</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Day</Form.Label>
                    <Form.Control as="select" value={day} onChange={(e) => setDay(e.target.value)}>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="weekly">Weekly</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Get Horoscope
                </Button>
            </Form>

            {horoscope && <Alert variant="success">{horoscope}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
        </Container>
    );
};

export default Horoscope;
