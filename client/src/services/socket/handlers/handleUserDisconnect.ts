import { chatsCache, contactsCache } from '@/queryClient';

interface UserDisconnectPayload {
  userId: number; // User id who is disconnected
  lastSeenTime?: number;
}

const handleUserDisconnect = ({
  userId,
  lastSeenTime,
}: UserDisconnectPayload) => {
  chatsCache.handlePartnerDisconnect(userId, lastSeenTime);
  contactsCache.handleContactDisconnect(userId);
};

export default handleUserDisconnect;
