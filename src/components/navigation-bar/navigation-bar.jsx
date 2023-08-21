import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg" variant="light" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Sangam Flix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/" className="mr-3">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="mr-3">
                  My Profile
                </Nav.Link>
                <Button variant="outline-danger" onClick={onLoggedOut}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup" className="mr-3">
                  Signup
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="mr-3">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
