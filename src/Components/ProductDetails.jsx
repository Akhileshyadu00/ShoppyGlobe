import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Utils/cartSlice';
import { Loader2, AlertTriangle } from 'lucide-react';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const fetchProduct = async () => {
      try {
        setError('');
        setProduct(null);
        const res = await fetch(`https://fakestoreapi.in/api/products/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setError('Failed to fetch product details.');
        }
      }
    };

    fetchProduct();
    return () => controller.abort();
  }, [id]);

  if (error) {
    return (
      <div className="text-red-500 text-center flex flex-col items-center justify-center gap-2" aria-live="polite">
        <p className="flex items-center gap-2">
          <AlertTriangle /> {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <p className="text-gray-600 text-center flex items-center justify-center gap-2" aria-live="polite">
        <Loader2 className="animate-spin" /> Loading product...
      </p>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
      <img
        src={product.image || product.thumbnail}
        alt={product.title}
        className="w-full h-80 rounded shadow-lg object-cover bg-gray-100"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = product.thumbnail || 'https://via.placeholder.com/300';
        }}
      />

      <div>
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-semibold mb-4">
          Price: <span className="text-green-600">${product.price}</span>
        </p>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-400 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
