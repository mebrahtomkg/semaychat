import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: 'users',

  initialState,

  reducers: {
    manyUsersAdded(state, action: PayloadAction<User[]>) {
      const newUsers = action.payload;

      const otherExistingUsers = state.filter(
        (user) => !newUsers.some((newUser) => newUser.id === user.id),
      );

      return [...otherExistingUsers, ...newUsers];
    },
  },
});

export default usersSlice.reducer;

export const { manyUsersAdded } = usersSlice.actions;
