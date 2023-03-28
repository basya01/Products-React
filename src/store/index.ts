import { configureStore } from '@reduxjs/toolkit';
import products from './slices/products';
import filters from './slices/filters';

export const store = configureStore({
  reducer: { products, filters },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
