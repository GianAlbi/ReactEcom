import { Badge, Card, Col, Row, Button, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { useState } from "react";
import '../style/StyleCard.css';

function CardProduct({ products }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const { addToCart } = useCart();

  const toggleBorder = (index) => {
    setSelectedCard(selectedCard === index ? null : index);
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading products...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Row className="justify-content-center">
      {products.map((product, index) => (
        <Col xs={12} md={6} lg={3} key={product.id}>
          <Card 
            className={`card-book ${selectedCard === index ? 'card-selected' : ''}`}
            onClick={() => toggleBorder(index)}
          >
            <Card.Img 
              className="card-img"
              variant="top" 
              src={product.thumbnail} 
              alt={product.title}
            />
            <Card.Body className="card-body">
              <div className="mb-2">
                <Card.Title className="mb-1">{product.title.substring(0, 20)}...</Card.Title>
                <Badge bg="secondary" id="card-badge">
                  {product.brand}
                </Badge>
              </div>
              
              <div className="mt-auto">
                <Card.Text className="mb-2">
                  ${product.price} | ⭐{product.rating}
                </Card.Text>
                
                <div className="d-flex justify-content-between">
                  <Link 
                    to={`/product/${product.id}`} 
                    className="btn btn-sm btn-outline-light"
                    onClick={(e) => e.stopPropagation()}
                  >
                    DETAILS
                  </Link>
                  
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    ADD TO CART
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default CardProduct;