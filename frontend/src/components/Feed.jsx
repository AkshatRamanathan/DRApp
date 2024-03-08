import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Feed({ user }) {

    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/posts/feed`);
            const newData = await response.json();
            setData(newData);
        }
        fetchData();
        console.log(data)
    }, [user]);

    return (
        <Container style={{ height: "550px" }}>
            <h2>My FEED</h2><hr />
            <Row style={{ overflow: 'scroll' }}>
                {data?.map((item) =>
                    <Col>
                        <Card style={{ height: '15rem', width: "320px" }}>
                            <Card.Header as="h5">{item.title}</Card.Header>
                            <Card.Body>
                                {item.content}
                            </Card.Body>
                            <Card.Footer><i class="bi bi-heart p-2"></i>{item.likeCount}</Card.Footer>
                        </Card>
                        <br />
                    </Col>
                )}
            </Row>
        </Container >

    )
}
