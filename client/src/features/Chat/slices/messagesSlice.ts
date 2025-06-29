import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Message } from '@/types';

const initialState: Message[] = [];

export const messagesSlice = createSlice({
  name: 'messages',

  initialState,

  reducers: {
    manyMessagesAdded(state, action: PayloadAction<Message[]>) {
      const newMessages = action.payload;

      const otherExistingMessages = state.filter(
        (message) =>
          !newMessages.some((newMessage) => newMessage?.id === message?.id)
      );

      return [...otherExistingMessages, ...newMessages];
    },

    messageAdded(state, action: PayloadAction<Message>) {
      const newMessage = action.payload;

      const otherExistingMessages = state.filter(
        (message) => message.id !== newMessage.id
      );

      return [...otherExistingMessages, newMessage];
    },

    messageUpdated(state, action: PayloadAction<Message>) {
      return state.map((message) =>
        message.id === action.payload.id ? action.payload : message
      );
    },

    messageDeleted(state, action: PayloadAction<number>) {
      return state.filter((message) => message.id !== action.payload);
    }
  }
});

export default messagesSlice.reducer;

export const {
  manyMessagesAdded,
  messageAdded,
  messageUpdated,
  messageDeleted
} = messagesSlice.actions;
