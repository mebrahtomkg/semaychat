import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: number[] = [];

export const blockedUsersSlice = createSlice({
  name: 'blockedUsers',

  initialState,

  reducers: {
    blockedUsersFetched(state, action: PayloadAction<number[]>) {
      return action.payload;
    },

    blockedUserAdded(state, action: PayloadAction<number>) {
      return [...state, action.payload];
    },

    blockedUserDeleted(state, action: PayloadAction<number>) {
      return state.filter((blockedUser) => blockedUser !== action.payload);
    },
  },
});

export default blockedUsersSlice.reducer;

export const { blockedUsersFetched, blockedUserAdded, blockedUserDeleted } =
  blockedUsersSlice.actions;
