
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  tempItems: [],
  totalPrice: 0,
};

// Try to hydrate from localStorage
const saved = localStorage.getItem('cart');
if (saved) {
  try {
    Object.assign(initialState, JSON.parse(saved));
  } catch {}
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });

      state.tempItems = [...state.items];
      state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
      state.tempItems = [...state.items];
      state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
    updateTempQuantity(state, action) {
      const t = state.tempItems.find(i => i.id === action.payload.id);
      if (t) t.quantity = action.payload.quantity;
    },
    applyTempUpdate(state, action) {
      const t = state.tempItems.find(i => i.id === action.payload);
      const c = state.items.find(i => i.id === action.payload);
      if (t && c) c.quantity = t.quantity;
      state.totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateTempQuantity,
  applyTempUpdate,
} = cartSlice.actions;

export default cartSlice.reducer;
