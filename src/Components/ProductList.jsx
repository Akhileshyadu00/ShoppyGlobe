import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../Utils/productSlice';
import { addToCart } from '../Utils/cartSlice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // ✅ Import
import Pagination from './Pagination';

function ProductList() {
  const { items: products, status } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Hook to navigate
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const pageHandle = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProduct());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className="p-6 text-center">
        <p className="text-lg font-medium text-indigo-600">Loading Products...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="p-6 text-center">
        <p className="text-lg font-medium text-red-600">Failed to load products.</p>
      </div>
    );
  }

  if (!Array.isArray(products)) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>Unexpected data format</p>
      </div>
    );
  }

  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Product List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex flex-col bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-56 object-contain mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-green-600 font-bold text-lg mb-2">
              ${product.price}
            </p>
            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
              {product.description}
            </p>
            <p className="text-xs text-gray-500 italic mb-4">
              Category: {product.category?.name}
            </p>
            <div className="mt-auto flex gap-3">
              <button
                onClick={() => navigate(`/product/${product.id}`)} // ✅ Navigate to detail
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition"
              >
                View
              </button>
              <button
                onClick={() => dispatch(addToCart({ product, quantity: 1 }))} // ✅ Add with quantity
                className="flex-1 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 focus:ring-4 focus:ring-teal-200 transition"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center">
        <Pagination
          pageHandler={pageHandle}
          page={page}
          dynamicPage={totalPages}
        />
      </div>
    </div>
  );
}

export default ProductList;
