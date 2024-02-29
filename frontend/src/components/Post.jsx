import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Mapper from '../services/MapperService';
import { useParams } from 'react-router-dom';

export default function Post() {
    const [data, setData] = useState();
    const [design, setDesign] = useState();
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/post/${id}`);
            const JSON = await response.json();
            setData(JSON.data);
            setDesign(JSON.renderList)

        }
        fetchData();
    }, [])

    return (
        <Card style={{ height: '550px' }}>
            <Card.Header>View Post</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="loginForm">
                        {
                            design && design.map(element => Mapper(element))
                        }
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}
