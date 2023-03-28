import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types/models/Category';

interface FiltersState {
  page: number;
  search: string;
  category: Category;
}

const initialState: FiltersState = { page: 1, search: '', category: null };

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<Category>) {
      state.category = action.payload;
    },
  },
});

export const { setSearch, setCategory } = productsSlice.actions;
export default productsSlice.reducer;
