import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: number[] = [];

export const contactsSlice = createSlice({
  name: 'contacts',

  initialState,

  reducers: {
    contactsFetched(state, action: PayloadAction<number[]>) {
      return action.payload;
    },

    contactAdded(state, action: PayloadAction<number>) {
      return [...state, action.payload];
    },

    contactDeleted(state, action: PayloadAction<number>) {
      return state.filter((contact) => contact !== action.payload);
    }
  }
});

export default contactsSlice.reducer;

export const { contactsFetched, contactAdded, contactDeleted } =
  contactsSlice.actions;
