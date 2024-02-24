import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function Mapper(item) {
    switch (item.type) {
        case 'label': return (<><Form.Label name={item.id} htmlFor={item.id}>{item.name.toUpperCase()}</Form.Label><br /></>);
        case 'input': return (<><Form.Control name={item.id} id={item.id} type={item.input} placeholder={item.name} /><br /></>);
        case 'button': return (<><Button type={item.action} id={item.id} variant='primary'>{item.action.toUpperCase()}</Button><br /></>)
        default: break;
    }
}
