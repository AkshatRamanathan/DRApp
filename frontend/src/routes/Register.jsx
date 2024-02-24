import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { DesignContext } from '../services/Contexts';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Mapper from '../services/MapperService';

export default function Login() {
  const { design, data } = useContext(DesignContext);

  return (
      <Card style={{ width: '34rem' }}>
        <Card.Header as="h4">Register</Card.Header>
        <Card.Body>
          {data?.info && <Alert key={data?.info?.type} variant={data?.info?.type}>{data?.info?.message}<br /></Alert>}
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
