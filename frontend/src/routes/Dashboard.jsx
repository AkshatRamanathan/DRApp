import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DesignContext } from '../services/Contexts';
import Mapper from '../services/MapperService';
import { Route, Routes } from 'react-router-dom';
import Feed from '../components/Feed';
import PostsTable from '../components/PostsTable';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import Util from '../components/Util';

function ToolsPanel() {
    return (
        <Container>
            <Row>
                <Col>
                    <Util util="Total Likes" />
                </Col>
                <Col>
                    <Util util="Total Posts" />
                </Col>
            </Row>
            <br />
            <Util util="Total Followers" />
        </Container>
    )
}

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
                        <Card.Header>My Options</Card.Header>
                        <Card.Body>
                            {
                                design && design.map(element => Mapper(element))
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Routes>
                        {/* <Route path='/table/:entityType' element={<Table />} /> make table generic for Posttable or usertable*/}
                        <Route path='/feed' element={<Feed user={user} />} />
                        <Route path='/create' element={<CreatePost user={user} />} />
                        <Route path='/posts' element={<PostsTable user={user} />} />
                        <Route path='/post/:id' element={<Post />} />
                        <Route path='/' element={<ToolsPanel />} />

                    </Routes>

                </Col>
            </Row>
        </Container >
    )
}
