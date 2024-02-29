import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';


export default function Mapper(item) {
    switch (item.type) {
        case 'label': return (<><Form.Label name={item.id} htmlFor={item.id}>{item.name.toUpperCase()}</Form.Label><br /></>);
        case 'input': return (<><Form.Control name={item.id} id={item.id} type={item.input} placeholder={item.name} disabled={item.disabled} /><br /></>);
        case 'textarea': return (<><Form.Control as="textarea" disabled={item.disabled} rows={13} name={item.id} id={item.id} type={item.input} placeholder={item.name}/><br /></>);
        case 'button': return (<><Button type={item.action} id={item.id} variant='primary' disabled={item.disabled}>{item.action.toUpperCase()}</Button><br /></>)
        case 'nav': return (<Nav><Nav.Link bg="primary" href={item.href}>{item.name.toUpperCase()}</Nav.Link></Nav>)
        default: break;
    }
}
