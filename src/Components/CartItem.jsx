import React from 'react'
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Utils/cartSlice';
import PropTypes from 'prop-types';

function CartItem({item}) {
 const dispatch = useDispatch();

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="cart-item">
      <h4>{item.title}</h4>
      <p>Price: ${item.price}</p>
      <input
        type="number"
        min="1"
        value={item.quantity}
        onChange={handleChange}
      />
      <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem
