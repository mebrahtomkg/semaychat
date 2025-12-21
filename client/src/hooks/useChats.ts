import { Chat, MessageRequest } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { get } from '@/api';
import { useMemo } from 'react';
import { QUERY_KEY_CHATS } from '@/constants';
import useMessageRequests from './useMessageRequests';
import { createPendingMessage } from '@/utils';

const msgSendRequestsSelector = (requests: MessageRequest[]) =>
  requests.filter(
    (req) =>
      req.requestType === 'TEXT_MESSAGE_SEND' ||
      req.requestType === 'FILE_MESSAGE_SEND',
  );

const useChats = (): Chat[] => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_CHATS],
    queryFn: () => get<Chat[]>('/chats'),
  });

  const msgSendRequests = useMessageRequests(msgSendRequestsSelector);

  const chats = useMemo(() => {
    const serverChats = data || [];

    // Use map to avoid duplicate chats
    const map = new Map<number, Chat>();

    serverChats.forEach((chat) => {
      map.set(chat.partner.id, chat);
    });

    msgSendRequests.forEach((req) => {
      map.set(req.payload.receiver.id, {
        partner: req.payload.receiver,
        lastMessage: createPendingMessage(req),
      });
    });

    // Sort the chats:
    const sortedChats = Array.from(map.values()).sort((a, b) => {
      const aIsPending = a.lastMessage && a.lastMessage.id < 0;
      const bIsPending = b.lastMessage && b.lastMessage.id < 0;

      // Prioritize pending messages
      if (aIsPending && !bIsPending) {
        return -1; // 'a' (pending) comes before 'b' (not pending)
      }
      if (!aIsPending && bIsPending) {
        return 1; // 'b' (pending) comes before 'a' (not pending)
      }

      // If both are pending or both are not pending, sort by createdAt (most recent first)
      if (b.lastMessage && a.lastMessage) {
        return b.lastMessage.createdAt - a.lastMessage.createdAt;
      }

      // Fallback for cases where lastMessage might be missing
      return 0;
    });

    return sortedChats;
  }, [data, msgSendRequests]);

  return chats;
};

export default useChats;
