import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Container, Row, Col, Image, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import "../style/StyleCard.css"

function ProductDetail() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(p => p.id === Number(id));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setNotFound(true);
      }
    }
  }, [id, products]);

  if (notFound) {
    return (
      <Container className="mt-5" >
        <Alert variant="danger">
          Product not found!
        </Alert>
        <Button 
          variant="primary" 
          onClick={() => navigate(location.state?.fromAdmin ? '/admin' : '/')} 
          className="mt-3"
        >
          {location.state?.fromAdmin ? 'Torna alla Admin' : 'Torna alla Home'}
        </Button>
      </Container>
    );
  }

  if (loading || !product) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5" id='conteProdu'>
      <Row>
        <Col md={6}>
          <Image 
            src={product.thumbnail} 
            alt={product.title} 
            fluid 
            className="rounded shadow"
            style={{ maxHeight: '500px', objectFit: 'contain' }}
          />
        </Col>
        <Col md={6}>
          <h1>{product.title}</h1>
          <Badge bg="secondary" className="mb-3">{product.brand}</Badge>
          <p className="fs-4">${product.price.toFixed(2)}</p>
          <p>Rating: {product.rating}/5</p>
          <p>Availability: 
            <Badge bg={product.stock > 0 ? 'success' : 'danger'} className="ms-2">
              {product.stock > 0 ? `${product.stock} disponibili` : 'Esaurito'}
            </Badge>
          </p>
          
          <div className="mb-4">
            <h4>Description</h4>
            <p>{product.description}</p>
          </div>

          {product.stock > 0 && (
            <Button 
              variant="danger" 
              size="lg"
              onClick={() => addToCart(product)}
              className="me-3"
            >
              Add to Cart
            </Button>
          )}
          
          <Button className ='RetBu'
            variant={location.state?.fromAdmin ? 'primary' : 'outline-primary'} 
            onClick={() => navigate(location.state?.fromAdmin ? '/admin' : '/')}
            size="lg"
          >
            {location.state?.fromAdmin ? 'Return to the Admin Page' : 'Return to Products'}
          </Button>
        </Col>
      </Row>
      
      {product.images && product.images.length > 1 && (
        <Row className="mt-5">
          <h4>More images</h4>
          {product.images.slice(1, 4).map((img, index) => (
            <Col key={index} xs={4}>
              <Image 
                src={img} 
                alt={`${product.title} ${index + 2}`} 
                thumbnail 
                className="m-2"
                style={{ height: '150px', objectFit: 'cover' }}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ProductDetail;