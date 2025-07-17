import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MyNavbar from './componenti/MyNavbar';
import Home from './pages/Home';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Admin from './pages/Admin';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <MyNavbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;