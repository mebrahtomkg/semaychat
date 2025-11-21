import { create } from 'zustand';
import {
  ChatDeleteRequest,
  FileMessageSendRequest,
  MessageDeleteRequest,
  MessageMarkAsReadRequest,
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

const deduplicateRequests = (requests: MessageRequest[]) => {
  const messageMarkAsReadRequests = requests.filter(
    (req) => req.requestType === 'MESSAGE_MARK_AS_READ',
  );

  // Use map for deduplicate process for performance advantage.
  const map = new Map<number, MessageMarkAsReadRequest>();
  for (const req of messageMarkAsReadRequests) {
    const key = req.payload.chatPartnerId;
    const existingReq = map.get(key);

    // If the request is not in the map(or it is undefined in any case), add it and
    // skip the rest logic below
    if (!existingReq) {
      map.set(key, req);
      continue;
    }

    // Replace the existing request only if the current request belong to a more recent message.
    // this way we do not send unnecessary duplicate requests that do the same thing.
    // Because a more recent message(larger message id) in a specific chat will mark all
    // unread message of that chat as read in the server.
    if (req.payload.messageId > existingReq.payload.messageId) {
      map.set(key, req);
    }
  }

  // Get all non MessageMarkAsReadRequests
  const filteredRequests: MessageRequest[] = requests.filter(
    (req) => req.requestType !== 'MESSAGE_MARK_AS_READ',
  );

  // Populate the message mark as read requests from the map to the array
  for (const value of map.values()) {
    filteredRequests.push(value);
  }

  // Sort based on request id. older requests comes first.
  return filteredRequests.sort((a, b) => a.requestId - b.requestId);
};

export const addMessageMarkAsReadRequest = (
  payload: MessageMarkAsReadRequest['payload'],
) => {
  const request: MessageMarkAsReadRequest = {
    requestType: 'MESSAGE_MARK_AS_READ',
    requestId: getUniqueId(),
    payload,
  };
  setMessageRequestsState((state) => deduplicateRequests([...state, request]));
};

export const deleteMessageRequest = (requestId: number) => {
  setMessageRequestsState((prevRequests) =>
    prevRequests.filter((request) => request.requestId !== requestId),
  );
};
