import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  FileMessageSendRequest,
  MessageDeleteRequest,
  MessageRequest,
  MessageUpdateRequest,
  TextMessageSendRequest
} from '@/types';

let lastUniqueId = 0;

const getUniqueId = () => {
  return ++lastUniqueId;
};

const initialState: MessageRequest[] = [];

export const messageRequestsSlice = createSlice({
  name: 'messageRequests',

  initialState,

  reducers: {
    textMessageSendRequestAdded(
      state,
      action: PayloadAction<TextMessageSendRequest['payload']>
    ) {
      const request: TextMessageSendRequest = {
        requestType: 'TEXT_MESSAGE_SEND',
        requestId: getUniqueId(),
        payload: action.payload
      };

      return [...state, request];
    },

    fileMessageSendRequestAdded(
      state,
      action: PayloadAction<FileMessageSendRequest['payload']>
    ) {
      const request: FileMessageSendRequest = {
        requestType: 'FILE_MESSAGE_SEND',
        requestId: getUniqueId(),
        payload: action.payload
      };

      return [...state, request];
    },

    messageUpdateRequestAdded(
      state,
      action: PayloadAction<MessageUpdateRequest['payload']>
    ) {
      const request: MessageUpdateRequest = {
        requestType: 'MESSAGE_UPDATE',
        requestId: getUniqueId(),
        payload: action.payload
      };

      return [...state, request];
    },

    messageDeleteRequestAdded(
      state,
      action: PayloadAction<MessageDeleteRequest['payload']>
    ) {
      const request: MessageDeleteRequest = {
        requestType: 'MESSAGE_DELETE',
        requestId: getUniqueId(),
        payload: action.payload
      };

      return [...state, request];
    },

    messageRequestDeleted(state, action: PayloadAction<number>) {
      return state.filter((request) => request.requestId !== action.payload);
    }
  }
});

export default messageRequestsSlice.reducer;

export const {
  textMessageSendRequestAdded,
  fileMessageSendRequestAdded,
  messageUpdateRequestAdded,
  messageDeleteRequestAdded,
  messageRequestDeleted
} = messageRequestsSlice.actions;
