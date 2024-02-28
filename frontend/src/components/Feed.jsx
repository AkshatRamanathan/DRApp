import React from 'react'
import Card from 'react-bootstrap/Card';

export default function Feed({ user }) {
    return (
        <Card style={{ height: "550px" }}>
            <Card.Header>My Feed</Card.Header>
            <Card.Body>Feed of {JSON.stringify(user)}</Card.Body>
        </Card >
    )
}
