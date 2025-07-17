import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://dummyjson.com/products';
  const API_POST_URL = 'https://dummyjson.com/products/add';

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(API_POST_URL, {
        title: newProduct.title,
        brand: newProduct.brand,
        price: newProduct.price,
        description: newProduct.description,
        thumbnail: newProduct.imageUrl || 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        rating: newProduct.rating,
        stock: newProduct.stock
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      // Simula ID crescente per la demo (DummyJSON non lo fornisce)
      const createdProduct = {
        ...response.data,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
      };

      setProducts(prev => [createdProduct, ...prev]);
      return { success: true, product: createdProduct };
    } catch (err) {
      console.error("POST Error:", err);
      return { success: false, error: err.message };
    }
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    return { success: true };
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ 
      products, 
      loading, 
      error,
      addProduct,
      deleteProduct,
      fetchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);