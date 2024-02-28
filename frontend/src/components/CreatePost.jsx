import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { DesignContext } from '../services/Contexts';
import Mapper from '../services/MapperService';

export default function CreatePost({ user }) {
    // const { data, design } = useContext(DesignContext);
    const [data, setData] = useState();
    const [design, setDesign] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/posts/create`);
            const JSON = await response.json();
            setData(JSON.data);
            setDesign(JSON.renderList)

        }
        fetchData();
    }, [])

    return (
        <Card style={{ height: '550px' }}>
            <Card.Header>Create Post</Card.Header>
            <Card.Body>
                <Form action={data?.submit?.action} method={data?.submit?.method}>
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
