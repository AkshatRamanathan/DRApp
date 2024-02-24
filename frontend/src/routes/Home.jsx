import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { DesignContext } from '../services/Contexts';

export default function Home() {
  const { data } = useContext(DesignContext);
  return (
    <Card style={{ width: '75rem' }}>
      <Card.Body>
        <Container className='py-5 text-center'>
          <Row className='py-lg-5'>
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">{data?.title}</h1>
              <p className="lead text-body-secondary">{data?.content}</p>
              <Container>
                <Nav className="justify-content-center">
                  <Nav.Link href={data?.login?.href}>Login</Nav.Link>
                  <Nav.Link href={data?.register?.href}>Register</Nav.Link>
                </Nav>
              </Container>
            </div>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
}
