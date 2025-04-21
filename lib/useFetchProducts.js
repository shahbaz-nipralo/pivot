import { useState, useEffect } from 'react';

  const useFetchProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:1337/api/products?populate=*', {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
            }
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          setProducts(data.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);
  
    return { products, loading, error };
  };

export default useFetchProducts;