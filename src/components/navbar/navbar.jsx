import React from "react";
import "./navbar.scss"

import { Navbar, Container, Nav, Button, Fragment } from "react-bootstrap/";

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
    <>

  <Nav class="nav" className="navbar">
    <Navbar>
  <Navbar.Brand class="brand_color" href="/">Flix It Up</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-nabar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                        
                        { isAuth() && (
                            <Nav.Link href={`/users/${users}`} class="link_profile">Profile</Nav.Link> )}
                            { isAuth() && (
                                <Button  variant="link" onClick={() =>
                                { this.onLoggedOut() }}>Logout</Button> )}
                 
                </Navbar.Collapse>
                </Navbar>
  </Nav>

 </>
    )
   
}
