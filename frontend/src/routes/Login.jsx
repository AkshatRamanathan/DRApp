import React, { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { DesignContext } from '../services/Contexts';
import Form from 'react-bootstrap/Form';

export default function Login() {
  const { design, data } = useContext(DesignContext);

  const Mapper = (item) => {
    switch (item.type) {
      case 'label': return (<><Form.Label name={item.id} htmlFor={item.id}>{item.name.toUpperCase()}</Form.Label><br /></>);
      case 'input': return (<><Form.Control name={item.id} id={item.id} type={item.input} placeholder={item.name} /><br /></>);
      case 'button': return (<><Button type={item.action} id={item.id} variant='primary'>{item.action.toUpperCase()}</Button><br /></>)
      default: break;
    }
  }

  return (
    <Card style={{ width: '34rem' }}>
      <Card.Header as="h4">Login</Card.Header>
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
