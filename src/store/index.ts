import { configureStore } from '@reduxjs/toolkit';
import products from './slices/products';
import filters from './slices/filters';
import alerts from './slices/alerts';

export const store = configureStore({
  reducer: { products, filters, alerts },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
