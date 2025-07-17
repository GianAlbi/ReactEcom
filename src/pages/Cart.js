import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../style/StyleCard.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h2 id="h2car">Your cart is empty</h2>
        <Button variant="primary" onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 id='h2contcart' className="mb-4">Your Shopping Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    style={{ width: '50px', marginRight: '10px' }}
                  />
                  {item.title}
                </div>
              </td>
              <td>${item.price}</td>
              <td>
                <input 
                  type="number" 
                  min="1" 
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  style={{ width: '60px' }}
                />
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => removeFromCart(item.id)}
                >
                  REMOVE
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="mt-4">
        <Col md={{ span: 4, offset: 8 }}>
          <h4 id='h4mon' >TOTAL: ${cartTotal.toFixed(2)}</h4>
          <Button id='butout' variant="success" className="mt-2">
            Proceed to Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;