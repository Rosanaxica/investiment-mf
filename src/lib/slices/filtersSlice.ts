import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  searchTerm: string;
  selectedType: string;
  sortBy: 'name' | 'amount' | 'return' | 'date';
  sortOrder: 'asc' | 'desc';
}

const initialState: FiltersState = {
  searchTerm: '',
  selectedType: '',
  sortBy: 'date',
  sortOrder: 'desc',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'name' | 'amount' | 'return' | 'date'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedType = '';
      state.sortBy = 'date';
      state.sortOrder = 'desc';
    },
  },
});

export const {
  setSearchTerm,
  setSelectedType,
  setSortBy,
  setSortOrder,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer; 