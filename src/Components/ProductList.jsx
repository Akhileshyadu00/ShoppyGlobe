import React, { useEffect } from 'react';

import {useDispatch, useSelector} from 'react-redux'
import { fetchProduct } from '../Utils/productSlice';
import { addToCart } from '../Utils/cartSlice';



function ProductList() {

  // useSelector === having acces to State
    const { items: products, status } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProduct());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="p-6 text-center">
        <p className="text-lg font-medium text-blue-600">Loading Products...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="p-6 text-center">
        <p className="text-lg font-medium text-red-600">Failed to load products.</p>
      </div>
    );
  }

  // Optional guard
  if (!Array.isArray(products)) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>Unexpected data format</p>
      </div>
    );
  }

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await axios.get('https://fakestoreapi.in/api/products?limit=150')
  //       const data = response.data.products
  //      // console.log((data));
  //       setProducts(data) // Corrected this line
  //     } catch (err) {
  //       setError('Failed to fetch products');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProduct();
  // }, []);



  return (
    <div className="p-6 max-w-7xl mx-auto">
  <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
    Product List
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {products.map((product) => (
      <div
  key={product.id}
  className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition duration-300 flex flex-col"
>
  <img
    src={product.images[0]}
    alt={product.title}
    className="w-full h-60 object-contain mb-4"
  />
  <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
    {product.title}
  </h2>
  <p className="text-green-700 font-bold text-base mb-2">
    ${product.price}
  </p>
  <p className="text-sm text-gray-600 line-clamp-3">
    {product.description}
  </p>

  {/* Optional: Category */}
  <p className="text-xs text-gray-500 mt-1 italic">
    Category: {product.category?.name}
  </p>

  <div className="flex flex-col gap-2 mt-auto">
    <button
      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
      aria-label={`View details of ${product.title}`}
    >
      View Product
    </button>
    <button
        onClick={() => dispatch(addToCart(product))}
      className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 w-full"
      aria-label={`Add ${product.title} to cart`}

    >
      Add to Cart
    </button>
  </div>
</div>

    ))}
  </div>
</div>
  );
}

export default ProductList;
