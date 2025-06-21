import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Chat } from '@/types';

const initialState: Chat[] = [];

export const chatsSlice = createSlice({
  name: 'chats',

  initialState,

  reducers: {
    chatsFetched(_state, action: PayloadAction<Chat[]>) {
      return action.payload;
    }
  }
});

export default chatsSlice.reducer;

export const { chatsFetched } = chatsSlice.actions;
