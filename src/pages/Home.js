import { Col, Container, Row } from "react-bootstrap";
import CardProduct from "../componenti/CardProduct";
import MyNavbar from "../componenti/MyNavbar";
import '../style/StyleCard.css';
import { useProducts } from "../context/ProductContext";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

function Home() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Error fetching products: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <MyNavbar />
      <Container className="stilecont">
        <h1 className="text-center py-5 h1stile">PlanetStore</h1>
        <h2 className="text-center py-3 h2stile">-- Our Products --</h2>
        <Row>
          <Col>
            <CardProduct products={products || []} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;