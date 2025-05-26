import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching products
export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  }
);

// Slice definition
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',   // 'idle' | 'loading' | 'fulfilled' | 'failed'
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.items = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default productSlice.reducer;
