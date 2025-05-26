import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../Utils/productSlice';
import { addToCart } from '../Utils/cartSlice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { toast } from 'react-toastify';

function ProductList() {
  const { items: products, status } = useSelector((s) => s.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');

  const itemsPerPage = 6;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProduct());
    }
  }, [status, dispatch]);

  const uniqueCategories = ['All', ...new Set(products.map((p) => p.category?.name || p.category))];

  // Filtering
  let filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'All' || (p.category?.name || p.category) === category;
    return matchSearch && matchCategory;
  });

  // Sorting
  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'title-asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'title-desc') {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleAdd = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success('Added to cart!');
  };

  if (status === 'loading') return <p className="p-6 text-center">Loading Products…</p>;
  if (status === 'failed') return <p className="p-6 text-center text-red-600">Failed to load products.</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center">Product List</h1>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-200"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-200"
        >
          {uniqueCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-200"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="title-asc">Title: A → Z</option>
          <option value="title-desc">Title: Z → A</option>
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginated.length > 0 ? (
          paginated.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex flex-col bg-white rounded-2xl p-6 shadow-lg"
            >
              <img
                src={p.images?.[0] ?? p.image ?? '/placeholder.jpg'}
                alt={p.title}
                className="w-full h-56 object-contain mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">{p.title}</h2>
              <p className="text-green-600 font-bold text-lg mb-2">${p.price}</p>
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">{p.description}</p>
              <p className="text-xs italic text-gray-500 mb-4">
                Category: {p.category?.name || p.category}
              </p>
              <div className="mt-auto flex gap-3">
                <button
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  View
                </button>
                <button
                  onClick={() => handleAdd(p)}
                  className="flex-1 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination pageHandler={setPage} page={page} dynamicPage={totalPages} />
      </div>
    </div>
  );
}

export default ProductList;
