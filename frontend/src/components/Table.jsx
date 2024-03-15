
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import BTable from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';

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
        </Card>
    )
}
