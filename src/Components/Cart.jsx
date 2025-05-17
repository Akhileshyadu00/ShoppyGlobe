import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

function Cart() {
  const cartItems = useSelector(state => state.cart);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(total);

  return (
    <div className="cart max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty.{' '}
          <Link to="/product" className="text-blue-600 underline hover:text-blue-800">
            Shop now
          </Link>
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <h3 className="mt-6 text-xl font-semibold text-right">
            Total: {formattedTotal}
          </h3>
        </>
      )}
    </div>
  );
}

export default Cart;
