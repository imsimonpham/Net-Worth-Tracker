import { Link } from 'react-router-dom';
import {Container, Navbar} from 'react-bootstrap';

export default function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h3>Spendings Tracker</h3>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
