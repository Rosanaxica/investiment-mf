import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Investment {
  id: string;
  name: string;
  type: string;
  amount: number;
  return: number;
  date: string;
  status?: 'active' | 'pending' | 'completed';
}

interface InvestmentsState {
  investments: Investment[];
  loading: boolean;
  error: string | null;
}

const initialState: InvestmentsState = {
  investments: [
    {
      id: '1',
      name: 'Tesouro Direto',
      type: 'Renda Fixa',
      amount: 5000,
      return: 12.5,
      date: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Ações Petrobras',
      type: 'Renda Variável',
      amount: 3000,
      return: 8.2,
      date: '2024-02-01',
      status: 'active'
    },
    {
      id: '3',
      name: 'Fundos Imobiliários',
      type: 'Fundos',
      amount: 2500,
      return: 6.8,
      date: '2024-01-20',
      status: 'active'
    }
  ],
  loading: false,
  error: null,
};

const investmentsSlice = createSlice({
  name: 'investments',
  initialState,
  reducers: {
    addInvestment: (state, action: PayloadAction<Investment>) => {
      state.investments.push(action.payload);
    },
    removeInvestment: (state, action: PayloadAction<string>) => {
      state.investments = state.investments.filter(
        investment => investment.id !== action.payload
      );
    },
    updateInvestment: (state, action: PayloadAction<Investment>) => {
      const index = state.investments.findIndex(
        investment => investment.id === action.payload.id
      );
      if (index !== -1) {
        state.investments[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addInvestment,
  removeInvestment,
  updateInvestment,
  setLoading,
  setError,
  clearError,
} = investmentsSlice.actions;

export default investmentsSlice.reducer; 