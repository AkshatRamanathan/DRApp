
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import BTable from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Table() {
    const { entityType } = useParams();
    const [data, setData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/${entityType}/all`);
            const newData = await response.json(); //newData has data and columns
            if (!newData) {
                setData({});

            }
            setData(newData);
        }
        fetchData();
    }, []);

    const handleSearch = async (e) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = data?.data?.filter(item => {
            const firstKey = Object.keys(item)[0]; // Assuming the first key is the one you want to filter on
            return item[firstKey].toLowerCase().includes(searchTerm);
        });
        setData({ columns: data.columns, data: filtered });
    }

    const handleDelete = async (e, dataItem) => {
        e.stopPropagation();
        const resp = await fetch(`/api/${entityType}/delete/${dataItem._id}`, { method: 'DELETE' });
        const json = await resp.json()
        window.location.href = json?.data?.redirect;

    }

    const handleEdit = async (e, dataItem) => {
        e.stopPropagation();
        window.location.href = `/dashboard/${entityType}/${dataItem._id}?enable=true`
    }

    const handleFollow = async (e, dataItem) => {
        e.stopPropagation();
        console.log(dataItem);
        const resp = await fetch(`/api/${entityType}/follow/${dataItem.username}`);
        const json = await resp.json()
        window.location.href = json?.data?.redirect;
    }

    return (
        <Card style={{ height: "550px" }}>
            <Card.Header>My {entityType?.toString().toUpperCase()}</Card.Header>
            <Card.Body>
                {
                    entityType === 'search' ?
                        <Container className='d-flex justify-content-end'>
                            <Row className='w-50'><Col className='p-2'>
                                <InputGroup onChange={handleSearch}>
                                    <Form.Control
                                        placeholder="Enter to search..." />
                                    <Button variant="outline-primary">
                                        <i className="bi bi-search"></i>
                                    </Button>
                                </InputGroup>
                            </Col>
                            </Row>
                        </Container>
                        : null
                }
                <BTable variant='light' bordered hover>
                    <thead>
                        <tr>
                            {data?.columns?.map((col) => { return <th>{col.toUpperCase()}</th> })}
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.data?.map((dataItem, idx) => {
                                return <tr onClick={() => { entityType === 'posts' ? location.href = `/dashboard/${entityType}/${dataItem._id}` : null }} key={idx}>
                                    {
                                        data.columns.map(col => <td>{dataItem[col]}</td>)
                                    }
                                    <td>
                                        {entityType === 'search' ? <i onClick={(e) => { handleFollow(e, dataItem) }} className="btn btn-primary bi bi-star"></i> : <i onClick={(e) => { handleDelete(e, dataItem) }} className="btn btn-primary bi bi-trash3"></i>}
                                        {' '}
                                        {entityType === 'posts' ? <i onClick={(e) => { handleEdit(e, dataItem) }} className="btn  btn-primary bi bi-pencil-square"></i> : null}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </BTable>
            </Card.Body>
        </Card >
    )
}
