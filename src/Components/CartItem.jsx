import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Utils/cartSlice';
import PropTypes from 'prop-types';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(item.price);

  const handleChange = (e) => {
    const value = e.target.value;
    const newQuantity = parseInt(value);

    // Allow empty input but do not update until valid positive number entered
    if (value === '') return;

    if (!isNaN(newQuantity) && newQuantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="cart-item flex items-center justify-between p-3 border-b">
      <div className="flex-1">
        <h4 className="font-semibold">{item.title}</h4>
        <p className="text-green-600 font-bold">{formattedPrice}</p>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor={`quantity-${item.id}`} className="sr-only">
          Quantity for {item.title}
        </label>
        <input
          id={`quantity-${item.id}`}
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleChange}
          className="w-16 border rounded px-2 py-1 text-center"
          aria-label={`Quantity for ${item.title}`}
        />
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          aria-label={`Remove ${item.title} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
