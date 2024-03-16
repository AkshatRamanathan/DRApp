import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

export default function Util({ user, util }) {

  return (
    <Card style={{ height: '16.4rem' }}>
      <Card.Header className="text-center" as="h5">{util}</Card.Header>
      <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {
          (util && util === 'Total Likes') ? <h1><Badge>L</Badge></h1> :
            (util && util === 'Total Posts') ? <h1><Badge>{user?.posts.length}</Badge></h1> : <h1><Badge>F</Badge></h1>
        }
      </Card.Body>
    </Card>
  )
}	
