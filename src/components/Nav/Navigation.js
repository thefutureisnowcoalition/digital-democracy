import React from 'react'
// import { NavLink } from 'react-router-dom'
import SearchBar from './searchbar/SearchBar'
import '../Nav/Nav.css'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";


function Navigation() {
  return (
    // <nav className="nav">
    //   <NavLink to="/" className="navlinks">Home</NavLink>
    //   <NavLink to="/comparison" className="navlinks">P.C.F</NavLink>
    //   <SearchBar />

    // </nav>

    // newly added nav from bootstrap

    <Navbar className="navigation" bg="transparent" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Digital Democracy</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="home-link" href="/">Home</Nav.Link>
            <Nav.Link className="pcf-link" href="/comparison">P.C.F</Nav.Link>
            <NavDropdown className="profile-link" title="Profile" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Signout
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          <SearchBar />
            
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          {/* </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation