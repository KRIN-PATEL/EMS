import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/K-logo.png";
import "../App.css";

const Header = () => {
  return (
    <Navbar
      style={{ backgroundColor: "#f4f9fd" }}
      expand="lg"
      sticky="top"
      className="bg-dark text-white"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "80px", height: "80px", marginRight: "10px" }}
          />
          <span className="ems-text">EMS</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="header-navbar-nav" />
        <Navbar.Collapse id="header-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="header-link text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/employee-directory" className="header-link text-white">
              Employee List
            </Nav.Link>
            <Nav.Link as={Link} to="/employee-create" className="header-link text-white">
              Add Employee
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
