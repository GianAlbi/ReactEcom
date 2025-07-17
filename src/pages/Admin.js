
import { useState } from 'react';
import { 
  Container, Button, Table, Modal, 
  Form, Alert, Badge, ButtonGroup, Spinner 
} from 'react-bootstrap';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaTrash, FaInfoCircle } from 'react-icons/fa';

function Admin() {
  const { products, loading, error, addProduct, deleteProduct } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    brand: '',
    price: 0,
    description: '',
    imageUrl: '',
    rating: 4.5,
    stock: 100
  });
  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'rating' || name === 'stock' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await addProduct(newProduct);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setAlert({ variant: 'success', message: 'Product created successfully!' });
      setNewProduct({
        title: '',
        brand: '',
        price: 0,
        description: '',
        imageUrl: '',
        rating: 4.5,
        stock: 100
      });
      setShowModal(false);
    } else {
      setAlert({ 
        variant: 'danger', 
        message: result.error || 'Error creating producto' 
      });
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const result = await deleteProduct(productId);
      if (result.success) {
        setAlert({ variant: 'success', message: 'Product successfully deleted!' });
      }
    }
  };

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );

  if (error) return (
    <Container className="mt-5">
      <Alert variant="danger">Error: {error}</Alert>
    </Container>
  );

  return (
    <Container className="mt-5 pt-4">
      {/* Header con pulsanti */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 id='h1Admin'>Admin Panel</h1>
        <ButtonGroup>
          <Button variant="outline-primary" onClick={() => navigate('/')} className="me-2 BuHo">
            <FaHome className="me-1 " /> Return to Home
          </Button>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <FaPlus className="me-1" /> Create Product
          </Button>
        </ButtonGroup>
      </div>

      {/* Alert messages */}
      {alert && (
        <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      {/* Tabella prodotti */}
      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                />
              </td>
              <td>{product.title}</td>
              <td>{product.brand}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Badge bg={product.stock > 0 ? 'success' : 'danger'}>
                  {product.stock}
                </Badge>
              </td>
              <td>
                <Button 
                  variant="info" 
                  size="sm" 
                  onClick={() => navigate(`/product/${product.id}`, { state: { fromAdmin: true } })}
                  className="me-2"
                >
                  <FaInfoCircle /> Details
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleDelete(product.id)}
                >
                  <FaTrash /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modale creazione prodotto */}
      <Modal show={showModal} onHide={() => !isSubmitting && setShowModal(false)} size="lg">
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>Create New Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newProduct.title}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand *</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={newProduct.brand}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price ($) *</Form.Label>
              <Form.Control
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="imageUrl"
                value={newProduct.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={newProduct.rating}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                min="0"
                value={newProduct.stock}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={() => setShowModal(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Sending...
                </>
              ) : 'Save Product'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default Admin;