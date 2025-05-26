// src/Components/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Utils/cartSlice';
import { toast } from 'react-toastify';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus('loading');
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setStatus('succeeded');
      })
      .catch(err => {
        setError(err.message);
        setStatus('failed');
      });
  }, [id]);

  if (status === 'loading') {
    return <p className="p-6 text-center">Loading…</p>;
  }
  if (status === 'failed') {
    return <p className="p-6 text-center text-red-600">Error: {error}</p>;
  }
  if (!product) {
    return <p className="p-6 text-center text-gray-500">Product not found.</p>;
  }

  const imageUrl =
    product.images?.[0] ??         // some APIs return an array
    product.image ??               // fallback to single-image field
    '/placeholder.jpg';            // final fallback

  const handleAdd = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success('Added to cart!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow-lg">
        <img
          src={imageUrl}
          alt={product.title || 'Product image'}
          onError={e => { e.currentTarget.src = '/placeholder.jpg'; }}
          className="w-full md:w-1/2 h-64 object-contain"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-green-600 font-semibold text-xl mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-sm italic text-gray-500 mb-6">
            Category: {product.category?.name || product.category}
          </p>
          <button
            onClick={handleAdd}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
