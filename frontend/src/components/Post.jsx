import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Mapper from '../services/MapperService';
import { useLocation, useParams } from 'react-router-dom';

export default function Post() {
    const [data, setData] = useState();
    const [design, setDesign] = useState();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/post/${id}`);
            const JSON = await response.json();

            if (!queryParams.get("enable")) {
                setData(JSON.data);
                setDesign(JSON.renderList)
            }
            else {
                let newDesign = JSON?.renderList;
                for (let item of newDesign) {
                    if (item.type === 'input' || item.type === 'textarea') {
                        item.disabled = !queryParams.get("enable");
                    }
                    if (item.type === 'button'){
                        item.action = "update"
                        item.display = "block"
                    }
                }
                let newData = JSON.data;
                newData.submit.action = `/api/post/edit/${id}`;
                setDesign(newDesign)
                setData(newData);
            }
        }
        fetchData();
    }, [])

    return (
        <Card style={{ height: '550px' }}>
            <Card.Header>View Post</Card.Header>
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
