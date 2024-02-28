import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DesignContext } from '../services/Contexts';
import Mapper from '../services/MapperService';
import { Route, Routes } from 'react-router-dom';
import Feed from '../components/Feed';

export default function Dashboard() {
    const { data, design } = useContext(DesignContext);
    const [user, setUser] = useState(null);
    useEffect(() => {
        setUser(data?.user);
    }, [data]);

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body as="h1">Welcome <span style={{ color: "red" }}>{(user?.username.toUpperCase())}</span>&nbsp;!</Card.Body>
                    </Card >
                </Col>
            </Row>
            <br />
            <Row>
                <Col lg="2">
                    <Card style={{ height: "550px" }}>
                        <Card.Header>Options</Card.Header>
                        <Card.Body>
                            {
                                design && design.map(element => Mapper(element))

                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Routes>
                        <Route path='/feed' element={<Feed user={user} />} />
                        <Route path='/posts' Component={null} />
                        <Route path='/' Component={null} />

                    </Routes>

                </Col>
            </Row>
        </Container>
    )
}
