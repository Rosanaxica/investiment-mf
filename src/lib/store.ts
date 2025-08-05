import { configureStore } from '@reduxjs/toolkit';
import investmentsReducer from './slices/investmentsSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    investments: investmentsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 