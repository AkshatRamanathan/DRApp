import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function Home() {
    return (
        <Card style={{ width: '75rem' }}>
            <Card.Body>
                <Container className='py-5 text-center'>
                    <Row className='py-lg-5'>
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">Loading...</h1>
                            <p className="lead text-body-secondary">Please wait while we fetch your details</p>
                        </div>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}
