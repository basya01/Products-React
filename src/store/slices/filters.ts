import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import queryString from 'query-string';
import { SortType } from '../../types/models';
import { Category } from '../../types/models/Category';

interface FiltersState {
  page: number;
  search: string;
  category: Category | null;
  sort: SortType;
}

interface ParamsUrl {
  page?: number;
  search?: string;
  category?: Category;
  sort?: SortType;
}

const search = window.location.search;
const paramsUrl: ParamsUrl = queryString.parse(search.slice(1, search.length));
const initialState: FiltersState = {
  page: Number(paramsUrl.page) || 1,
  search: paramsUrl.search || '',
  category: paramsUrl.category || null,
  sort: paramsUrl.sort || '',
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
    setCategory(state, action: PayloadAction<Category | null>) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      const sortType = action.payload;
      state.sort = sortType;
    },
  },
});

export const { setSearch, setCategory, setPage, setSort } = productsSlice.actions;
export default productsSlice.reducer;
