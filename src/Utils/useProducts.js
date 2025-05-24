import { useEffect, useState } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch('https://fakestoreapi.in/api/products?limit=150')
  //     .then(res => res.json())
  //     .then(data => {
  //       setProducts(data.products);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       setError('Failed to fetch products');
  //       setLoading(false);
  //     });
  // }, []);

  // useEffect( () => {
  //   const fetchProduct = async() => {
  //     const response = await fetch('fakestoreapi.in/api/products?limit=150');
  //     const data = await response.json();
  //     console.log((data));
      
  //   }
  //   fetchProduct()

  // }, [])


  return { products, error, loading };
};

export default useProducts;
