
import { Container, Navbar, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import '../style/StyleCard.css';

function MyNavbar() {
  const { cartItemCount } = useCart();
  const [animateBadge, setAnimateBadge] = useState(false);

  useEffect(() => {
    if (cartItemCount > 0) {
      setAnimateBadge(true);
      const timer = setTimeout(() => setAnimateBadge(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);

  return (
    <Navbar id="mainNavbar" expand="lg" className="bg-body-tertiary fixed-top">
      <Container fluid>
        <Navbar.Brand href="/" id='navstyle'>PlanetStore</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Link to="/admin" className="btn btn-outline-primary me-2 AdBu">
            Admin
          </Link>
          
          <Link to="/cart" className="me-3">
            <Button variant="outline-danger CaBu">
              Cart <Badge bg="danger" className={animateBadge ? 'badge-animate' : ''}>
                {cartItemCount}
              </Badge>
            </Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;