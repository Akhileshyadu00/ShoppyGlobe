import React from 'react';
import ProductItem from './ProductItem';
import useProducts from '../Utils/useProducts';

import { AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';



function ProductList() {
  const { products, error, loading } = useProducts(); // assuming `loading` is returned too

  if (loading) return (
  <p className="text-center text-gray-600 flex justify-center items-center gap-2">
    <Loader2 className="animate-spin" /> Loading products...
  </p>
  );

  if (error) return (
    <p className="text-center text-red-500 flex justify-center items-center gap-2">
     <AlertTriangle /> Error: {error}
    </p>
  );


   if (!Array.isArray(products) || products.length === 0) {
    return <p className="text-center text-gray-600">No products found.</p>;
  }

  return (
   <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {products.map(product => (
       <ProductItem key={product.id} product={product} />
      ))}
  </motion.div>
);
}

export default ProductList;
