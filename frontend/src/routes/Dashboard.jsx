import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { DesignContext } from '../services/Contexts';


export default function Dashboard() {
    const { data, design } = useContext(DesignContext);
    const [user, setUser] = useState(null);
    useEffect(() => {
        setUser(data?.user);
    }, [data]);

    return (
        <Card style={{ width: '75rem' }}>
            <Card.Body>
                Dashboard of {JSON.stringify(user)}
            </Card.Body>
        </Card>
    )
}
