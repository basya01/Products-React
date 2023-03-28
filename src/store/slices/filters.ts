import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  page: 0;
  search: string;
}

const initialState: FiltersState = { page: 0, search: '' };

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = productsSlice.actions;
export default productsSlice.reducer;
