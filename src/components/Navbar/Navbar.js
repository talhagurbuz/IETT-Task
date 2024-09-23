import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import './Navbar.css';
function Navbars (){
    return (
        <Navbar expand="lg" className="custom-navbar">
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className='d-flex justify-content-center' id="basic-navbar-nav">
            <Nav className="">
                <Nav.Link className='me-2' href="/home">Home</Nav.Link>
                <Nav.Link className='me-2' href="/endpoints">Endpoints</Nav.Link>
            </Nav>
            <Navbar.Brand href="/home">
                <img src="/logo-white.svg" />
            </Navbar.Brand>
            <Nav>
                <Nav.Link className='me-2' href="/listoftables">List Of Tables</Nav.Link>
                <Nav.Link href="/chops">Chops</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}


export default Navbars;
