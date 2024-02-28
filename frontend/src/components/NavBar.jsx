import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { DesignContext } from "../services/Contexts";

export default function NavBar() {
    const { data } = useContext(DesignContext);
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/"><img height="32" width="32" src='/favicons/favicon-32x32.png' alt='DRApp' /></Navbar.Brand>
                <Nav className="justify-content-end">
                    {
                        (data?.user) ?
                            <>
                                <Nav.Link href="/dashboard/">Dashboard</Nav.Link>
                                <Nav.Link href="/api/logout">Logout</Nav.Link>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link href="login">Login</Nav.Link>
                                <Nav.Link href="register">Register</Nav.Link>
                            </>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}
