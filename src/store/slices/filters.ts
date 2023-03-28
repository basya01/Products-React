import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoadingStatus } from '../../types/enums/LoadingStatus';
import { Product } from '../../types/models';

interface FiltersState {
  page: 0,

}

const initialState: FiltersState = { page: 0 };

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export const { } = productsSlice.actions;
export default productsSlice.reducer;
