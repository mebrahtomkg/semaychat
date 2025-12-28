import { chatsCache, contactsCache } from '@/queryClient';

interface UserConnectPayload {
  userId: number; // User id who is disconnected
}

const handleUserConnect = ({ userId }: UserConnectPayload) => {
  chatsCache.handlePartnerConnect(userId);
  contactsCache.handleContactConnect(userId);
};

export default handleUserConnect;
