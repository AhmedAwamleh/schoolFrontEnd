import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'

function NavBar() {



  return (
    <div>
      <nav>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Link to="/EditModal" onClick={""}>Home</Link>
              <Link to="#features">Features</Link>
              <Link to="#pricing">Pricing</Link>
              <Link to="#pricing">Pricing</Link>
            </Nav>
          </Container>
        </Navbar>

      </nav>
      <div>

      </div>
    </div>

  )
}

export default NavBar