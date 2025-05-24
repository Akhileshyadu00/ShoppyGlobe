import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProduct = createAsyncThunk('products/fetchProduct', async() => {
    const response = await axios.get('https://fakestoreapi.in/api/products?limit=150')
    return response.data
})

const ProductSlice = createSlice ({
    name: 'products',
    initialState: {
        items: [],
        status: "idle"
    },
    extraReducers:(builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.status='Loading'
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
            state.status='Fulfilled',
            state.items= action.payload
        })
        .addCase(fetchProduct.rejected, (state) => {
            state.status='Failed'
        })
    }
})

export default ProductSlice.reducer; //