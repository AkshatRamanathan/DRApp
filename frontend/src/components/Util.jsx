import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';

export default function Util({ util }) {

  return (
    <Card style={{ height: '15rem' }}>
      <Card.Header as="h5">{util}</Card.Header>
      <Card.Body>
        sdfsdfsdf
      </Card.Body>
    </Card>
  )
}
