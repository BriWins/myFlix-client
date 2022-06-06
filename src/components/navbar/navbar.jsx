import React from "react";

import { Navbar, Container, Nav, Button, Offcanvas, NavDropdown, Form, FormControl, Fragment } from "react-bootstrap/";

export function MenuBar({users}) {

const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
}

const isAuth = () => {
    if(typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("token")) {
        return localStorage.getItem("token");
    } else {
        return false;
    }};

    return (
        <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand className="navbar-logo" href="/">Flix It Up!</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-nabar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
            
                    <Nav className="ms-auto">
                        { isAuth() && (
                            <Nav.Link href={`/users/${users}`}>{users}</Nav.Link> )}
                            { isAuth() && (
                                <Button variant="link" onClick={() =>
                                { this.onLoggedOut() }}>Logout</Button> )}
                                { !isAuth() && (
                                    <Nav.Link href="/">Sign-in</Nav.Link>)}
                                    { !isAuth() && (
                                        <Nav.Link href="/register">Sign-up</Nav.Link>
                        )}   
                    </Nav>
                   
                </Navbar.Collapse>
            </Container>
        </Navbar>
     );
}
