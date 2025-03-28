import { Link } from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';

export default function NavBar({path}) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h3>Net Worth Tracker</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} to="/portfolio" 
              style={path === "/portfolio" ? {fontWeight: "bold" } : {}}>
              Portfolio
            </Nav.Link>
            <Nav.Link 
              as={Link} to="/spendings" 
              style={path === "/spendings" ? {fontWeight: "bold" } : {}}>
              Spendings
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
