import React, { useMemo } from 'react';
import ProductItem from './ProductItem';
import useProducts from '../Utils/useProducts';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

function ProductList({ searchQuery = '' }) {
  const { products, error, loading } = useProducts();

  // Memoize filtered products for performance
  const filtered = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  if (loading) {
    return (
      <p
        aria-live="polite"
        className="text-center text-gray-600 flex justify-center items-center gap-2"
      >
        <Loader2 className="animate-spin" /> Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p
        aria-live="polite"
        className="text-center text-red-500 flex justify-center items-center gap-2"
      >
        <AlertTriangle /> Error: {error?.message || error || 'Unknown error'}
      </p>
    );
  }

  if (filtered.length === 0) {
    return (
      <p aria-live="polite" className="text-center text-gray-600">
        No products found.
      </p>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {filtered.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </motion.div>
  );
}

export default ProductList;
