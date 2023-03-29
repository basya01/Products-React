import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from '../../types/models';

interface AlertsState {
  items: Alert[];
}

const initialState: AlertsState = { items: [] };

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert(state, action: PayloadAction<Omit<Alert, 'id'>>) {
      state.items.push({ ...action.payload, id: Date.now() });
    },
    deleteAlert(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => action.payload !== item.id);
    },
  },
});

export const { addAlert, deleteAlert } = alertsSlice.actions;
export default alertsSlice.reducer;