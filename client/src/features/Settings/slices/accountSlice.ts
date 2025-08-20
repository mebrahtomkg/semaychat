import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../../../types';

const initialState = null as Account | null;

const accountSlice = createSlice({
  name: 'account',

  initialState,

  reducers: {
    accountFetched(state, action: PayloadAction<Account | null>) {
      return action.payload;
    },

    accountUpdated(state, action: PayloadAction<Account | null>) {
      return { ...state, ...action.payload } as Account;
    },
  },
});

export const { accountFetched, accountUpdated } = accountSlice.actions;

export default accountSlice.reducer;
