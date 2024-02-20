import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { DesignContext } from '../services/Contexts';

export default function Login() {
  const { design, setDesign } = useContext(DesignContext);
  return (
    <Card>
      <Card.Header as="h5">Login</Card.Header>
      <Card.Body>
        <Card.Title>Login Page</Card.Title>
        <Card.Text className="justify-content-center">
          {JSON.stringify(design)}
        </Card.Text>
        <Button variant="primary">Login</Button>
      </Card.Body>
    </Card>
  )
}
