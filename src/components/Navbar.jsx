import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const ADNav = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">ADBookify</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/orders">My Orders</Nav.Link>
          <Nav.Link href="/book/listed">My Books</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default ADNav;
