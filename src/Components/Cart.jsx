// src/Components/Cart.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  applyTempUpdate,
  removeFromCart,
  updateTempQuantity,
} from "../Utils/cartSlice";

function Cart() {
  const { items, tempItems, totalPrice } = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Save to localStorage on any change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ items, tempItems, totalPrice }));
  }, [items, tempItems, totalPrice]);

  // Single-item handlers
  const handleRemove = id => dispatch(removeFromCart(id));
  const handleUpdate = (id, qty) => {
    dispatch(updateTempQuantity({ id, quantity: Math.max(1, qty) }));
  };
  const handleApplyOne = id => dispatch(applyTempUpdate(id));

  // “Apply All” button
  const hasUnsaved = tempItems.some(t => {
    const c = items.find(i => i.id === t.id);
    return c && c.quantity !== t.quantity;
  });
  const applyAll = () => tempItems.forEach(t => dispatch(applyTempUpdate(t.id)));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-xl text-gray-500 mb-4">Your cart is empty.</h2>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => navigate("/")}
          >
            Back to Shopping
          </button>
        </div>
      ) : (
        <>
          <AnimatePresence>
            <div className="grid gap-6">
              {items.map(item => {
                const temp = tempItems.find(t => t.id === item.id);
                const qty = temp ? temp.quantity : item.quantity;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    layout
                    className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md"
                  >
                    <img
                      src={item.images?.[0] ?? item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain"
                    />
                    <div className="flex flex-col flex-grow">
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="text-green-700 font-medium">${item.price}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          type="number"
                          min="1"
                          value={qty}
                          className="w-20 border px-2 py-1 rounded"
                          onChange={e => handleUpdate(item.id, Number(e.target.value))}
                        />
                        <button
                          className="text-blue-600 hover:underline font-medium"
                          onClick={() => handleApplyOne(item.id)}
                        >
                          Update
                        </button>
                        <button
                          className="text-red-500 hover:underline font-medium"
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>

          {hasUnsaved && (
            <div className="text-right mt-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                onClick={applyAll}
              >
                Apply All Quantity Changes
              </button>
            </div>
          )}

          <div className="mt-6 text-right text-xl font-bold text-gray-800">
            Total: ${Number(totalPrice || 0).toFixed(2)}
          </div>

          <div className="text-center mt-8">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => navigate("/")}
            >
              Back to Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
