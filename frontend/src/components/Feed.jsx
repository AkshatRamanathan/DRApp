import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Feed({ user }) {

    const [data, setData] = useState();

    const handleLike = async (e) => {
        e.target.classList = "bi bi-heart-fill";
        const item = data.find(item => item._id === e.target.id)
        item.likeCount += 1;
        setData([...data]);
        await fetch(`/api/post/like/${e.target.id}`);
    }
    
    const handleSearch = async (e) => {
        
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/posts/feed`);
            const newData = await response.json();
            setData(newData);
        }
        fetchData();
    }, [user]);

    return (
        <>
            <Container style={{ height: "550px", overflow: 'scroll' }}>
                <Row className='d-flex p-1 justify-content-between'>
                    <h2 className='w-25'>MY FEED</h2>
                    <InputGroup className="w-25">
                        <Form.Control
                            placeholder="Enter to search..." />
                        <Button onClick={handleSearch} variant="outline-primary">
                            <i className="bi bi-search"></i>
                        </Button>
                    </InputGroup>
                </Row>
                <hr />
                <Row>
                    {data?.map((item) =>
                        <Col>
                            <Card style={{ height: '22rem', width: "320px" }}>
                                <Card.Header as="h5">
                                    <Card.Title>{item.title}</Card.Title>
                                </Card.Header>
                                <Card.Body style={{ overflow: 'scroll' }}>
                                    {item.content}
                                </Card.Body>
                                <Card.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <i id={item._id} onClick={handleLike} className="bi bi-heart"></i>
                                    {item.likeCount}
                                    <Card.Text>{item.author}</Card.Text>
                                </Card.Footer>
                            </Card>
                            <br />
                        </Col>
                    )}
                </Row>
            </Container >
        </>
    )
}
