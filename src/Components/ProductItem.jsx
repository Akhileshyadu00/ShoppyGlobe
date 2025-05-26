import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Utils/productSlice';

function ProductItem({ product }) {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();  // corrected plural
  const inCartCount = cartItems.find(item => item.id === product.id)?.quantity || 0;

  const handleNavigate = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAdd = (e) => {
    e.stopPropagation();        // prevent card’s onClick
    addToCart(product);
  };

  return (
    <div
      onClick={handleNavigate}
      className="flex flex-col border border-gray-300 rounded-2xl overflow-hidden shadow hover:shadow-2xl transition duration-300 cursor-pointer p-4 bg-white h-full"
    >
      {/* Image */}
      <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4 aspect-square hover:scale-105 transition-transform duration-300">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-32 sm:h-40 object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Title and Price */}
      <div className="flex flex-col justify-between flex-grow mt-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
            {product.title}
          </h2>
          <p className="text-md font-bold text-gray-700 mb-4">
            Rs. {product.price}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition mt-auto"
          aria-label={`Add ${product.title} to cart`}
        >
          <IoCartOutline className="text-xl" />
          {inCartCount > 0 ? `Add Another (${inCartCount})` : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
