import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { Chat, Message } from '../../types';

const useChats = () => {
  const account = useAppSelector((state) => state.account);
  if (!account) throw new Error('Invalid account!');

  const messages = useAppSelector((state) => state.messages);
  const users = useAppSelector((state) => state.users);
  const contacts = useAppSelector((state) => state.contacts);
  const blockedUsers = useAppSelector((state) => state.blockedUsers);

  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const chatsMap = new Map<number, Message>();
    messages.forEach((message) => {
      const partnerId =
        message.senderId === account.id ? message.receiverId : message.senderId;

      const existing = chatsMap.get(partnerId);
      if (!existing || message.createdAt > existing.createdAt) {
        chatsMap.set(partnerId, message);
      }
    });

    const chats: Chat[] = [];

    for (const [partnerId, lastMessage] of chatsMap) {
      const partner = users.find((user) => user.id === partnerId);
      if (partner) chats.push({ partner, lastMessage });
    }

    // Sort by recent
    chats.sort((a, b) =>
      b.lastMessage && a.lastMessage
        ? b.lastMessage.createdAt - a.lastMessage.createdAt
        : 0
    );

    // If chat list are not enough, add users from contact list.
    if (chats.length < 10) {
      for (const contact of contacts) {
        if (!chats.some((chat) => chat.partner.id === contact)) {
          const partner = users.find((user) => user.id === contact);
          if (partner) chats.push({ partner });
        }

        if (chats.length === 10) break;
      }
    }

    // If chat list are still not enough, add users from suggetions list.
    if (chats.length < 10) {
      for (const user of users) {
        const isBlocked = blockedUsers.some(
          (blockedUser) => blockedUser === user.id
        );

        if (!isBlocked && !chats.some((chat) => chat.partner.id === user.id)) {
          chats.push({ partner: user });
        }

        if (chats.length === 10) break;
      }
    }

    setChats(chats);
  }, [account.id, blockedUsers, contacts, messages, users]);

  return chats;
};

export default useChats;
