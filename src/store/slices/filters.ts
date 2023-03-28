import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import queryString from 'query-string';
import { Category } from '../../types/models/Category';

interface FiltersState {
  page: number;
  search: string;
  category: Category;
}

interface ParamsUrl {
  page?: number;
  search?: string;
  category?: Category;
}

const pathname = window.location.pathname;
const paramsUrl: ParamsUrl = queryString.parse(pathname.slice(1, pathname.length));
const initialState: FiltersState = {
  page: paramsUrl.page || 1,
  search: paramsUrl.search || '',
  category: paramsUrl.category || null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<Category>) {
      state.category = action.payload;
    },
  },
});

export const { setSearch, setCategory, setPage } = productsSlice.actions;
export default productsSlice.reducer;
