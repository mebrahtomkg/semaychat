import { create } from 'zustand';
import {
  FileMessageSendRequest,
  MessageDeleteRequest,
  MessageRequest,
  MessageUpdateRequest,
  TextMessageSendRequest,
} from '@/types';
import { combine } from 'zustand/middleware';

let lastUniqueId = 0;

export const getUniqueId = () => {
  return ++lastUniqueId;
};

export interface MessageRequestsState {
  messageRequests: MessageRequest[];
}

const initialState: MessageRequestsState = {
  messageRequests: [],
};

const useMessageRequestsStore = create(
  combine(initialState, (set) => ({
    addTextMessageSendRequest: (payload: TextMessageSendRequest['payload']) => {
      const request: TextMessageSendRequest = {
        requestType: 'TEXT_MESSAGE_SEND',
        requestId: getUniqueId(),
        payload,
      };
      set((state) => ({
        messageRequests: [...state.messageRequests, request],
      }));
    },

    addFileMessageSendRequest: (payload: FileMessageSendRequest['payload']) => {
      const request: FileMessageSendRequest = {
        requestType: 'FILE_MESSAGE_SEND',
        requestId: getUniqueId(),
        payload,
      };
      set((state) => ({
        messageRequests: [...state.messageRequests, request],
      }));
    },

    addMessageUpdateRequest: (payload: MessageUpdateRequest['payload']) => {
      const request: MessageUpdateRequest = {
        requestType: 'MESSAGE_UPDATE',
        requestId: getUniqueId(),
        payload,
      };
      set((state) => ({
        messageRequests: [...state.messageRequests, request],
      }));
    },

    addMessageDeleteRequest: (payload: MessageDeleteRequest['payload']) => {
      const request: MessageDeleteRequest = {
        requestType: 'MESSAGE_DELETE',
        requestId: getUniqueId(),
        payload,
      };
      set((state) => ({
        messageRequests: [...state.messageRequests, request],
      }));
    },

    deleteMessageRequest: (requestId: number) => {
      set((state) => ({
        messageRequests: state.messageRequests.filter(
          (request) => request.requestId !== requestId,
        ),
      }));
    },
  })),
);

export default useMessageRequestsStore;
