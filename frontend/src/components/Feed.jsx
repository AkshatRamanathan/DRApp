import React from 'react'
import Card from 'react-bootstrap/Card';

export default function Feed({ user }) {
    return (
        <Card style={{ height: "550px" }}>
            <Card.Header>Feed</Card.Header>
            <Card.Body>Dashboard of {JSON.stringify(user)}</Card.Body>
        </Card >
    )
}
