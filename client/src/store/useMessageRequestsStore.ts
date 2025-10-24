import { create } from 'zustand';
import {
  ChatDeleteRequest,
  FileMessageSendRequest,
  MessageDeleteRequest,
  MessageRequest,
  MessageUpdateRequest,
  TextMessageSendRequest,
} from '@/types';

let lastUniqueId = 0;

export const getUniqueId = () => {
  return ++lastUniqueId;
};

const useMessageRequestsStore = create<MessageRequest[]>(() => []);

export default useMessageRequestsStore;

const setMessageRequestsState = (
  setStateFn: (prevRequests: MessageRequest[]) => MessageRequest[],
) => {
  useMessageRequestsStore.setState(setStateFn, true);
};

const addMessageRequest = (request: MessageRequest) => {
  setMessageRequestsState((prevRequests) => [...prevRequests, request]);
};

export const addTextMessageSendRequest = (
  payload: TextMessageSendRequest['payload'],
) => {
  const request: TextMessageSendRequest = {
    requestType: 'TEXT_MESSAGE_SEND',
    requestId: getUniqueId(),
    payload,
  };
  addMessageRequest(request);
};

export const addFileMessageSendRequest = (
  payload: FileMessageSendRequest['payload'],
) => {
  const request: FileMessageSendRequest = {
    requestType: 'FILE_MESSAGE_SEND',
    requestId: getUniqueId(),
    payload,
  };
  addMessageRequest(request);
};

export const addMessageUpdateRequest = (
  payload: MessageUpdateRequest['payload'],
) => {
  const request: MessageUpdateRequest = {
    requestType: 'MESSAGE_UPDATE',
    requestId: getUniqueId(),
    payload,
  };
  addMessageRequest(request);
};

export const addMessageDeleteRequest = (
  payload: MessageDeleteRequest['payload'],
) => {
  const request: MessageDeleteRequest = {
    requestType: 'MESSAGE_DELETE',
    requestId: getUniqueId(),
    payload,
  };
  addMessageRequest(request);
};

export const addChatDeleteRequest = (payload: ChatDeleteRequest['payload']) => {
  const request: ChatDeleteRequest = {
    requestType: 'CHAT_DELETE',
    requestId: getUniqueId(),
    payload,
  };
  addMessageRequest(request);
};

export const deleteMessageRequest = (requestId: number) => {
  setMessageRequestsState((prevRequests) =>
    prevRequests.filter((request) => request.requestId !== requestId),
  );
};
