import { chatsCache } from '@/queryClient';

interface UserConnectPayload {
  userId: number; // User id who is disconnected
}

const handleUserConnect = ({ userId }: UserConnectPayload) => {
  chatsCache.handlePartnerConnect(userId);
};

export default handleUserConnect;
