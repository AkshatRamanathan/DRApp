import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function NavBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">DRApp</Navbar.Brand>
                <Nav className="justify-content-end">
                    <Nav.Link href="login">Login</Nav.Link>
                    <Nav.Link href="register">Register</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
