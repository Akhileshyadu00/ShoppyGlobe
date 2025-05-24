import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.in/api/products?limit=150')
        const data = response.data.products
       // console.log((data));
        setProducts(data) // Corrected this line
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (loading) return <div className="p-6 text-center text-lg font-medium">Loading products...</div>;
  if (error) return <div className="p-6 text-center text-red-500 font-medium">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition duration-300 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h2>
            <p className="text-green-700 font-bold text-base mb-2">${product.price}</p>
            <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
            <button className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
  View Product
</button>
<button className="mt-auto bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">
  Add to Cart
</button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
