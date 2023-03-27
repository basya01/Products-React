import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoadingStatus } from '../../types/enums/LoadingStatus';
import { Product } from '../../types/models';

const API_URL = import.meta.env.VITE_API_URL;

interface Returned {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchProducts = createAsyncThunk('users/fetchProducts', async () => {
  const { data } = await axios.get(`${API_URL}products`);
  return data as Returned;
});

interface PostsState {
  items: Product[];
  status: LoadingStatus;
}

const initialState: PostsState = { items: [], status: LoadingStatus.IDLE };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    deleteProductById(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearProducts(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = LoadingStatus.PENDING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items.push(...action.payload.products);
        state.status = LoadingStatus.SUCCEEDED;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = LoadingStatus.FAILED;
      });
  },
});

export const { deleteProductById, clearProducts } = postsSlice.actions;
export default postsSlice.reducer;
