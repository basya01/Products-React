import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoadingStatus } from '../../types/enums/LoadingStatus';
import { Product } from '../../types/models';
import { Category } from '../../types/models/Category';

const API_URL = import.meta.env.VITE_API_URL;

interface Returned {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
interface FetchProductsArgs {
  page: number;
  category: Category;
  search: string;
}

export const fetchProducts = createAsyncThunk(
  'users/fetchProducts',
  async ({ page, category, search }: FetchProductsArgs) => {
    const categoryRoute = category ? '/category/' + category : '';
    const searchRoute = search ? '/search' : '';
    const limit = 10;
    const { data } = await axios.get(`${API_URL}products${searchRoute || categoryRoute || ''}`, {
      params: { limit, skip: (page - 1) * limit },
    });
    return data as Returned;
  }
);

interface ProductsState {
  items: Product[];
  total: number;
  skip: number;
  limit: number;
  status: LoadingStatus;
}

const initialState: ProductsState = { items: [], total: 0, skip: 0, limit: 0, status: LoadingStatus.IDLE };

const productsSlice = createSlice({
  name: 'products',
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
        state.items = [...action.payload.products];
        state.limit = action.payload.limit;
        state.skip = action.payload.skip;
        state.total = action.payload.total;
        state.status = LoadingStatus.SUCCEEDED;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = LoadingStatus.FAILED;
      });
  },
});

export const { deleteProductById, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
