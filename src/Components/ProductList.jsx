import React from 'react';
import ProductItem from './ProductItem';
import useProducts from '../Utils/useProducts';

function ProductList() {
  const { products, error, loading } = useProducts(); // assuming `loading` is returned too

  if (loading) return <p className="text-center text-gray-600">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
