import { useContacts, useUsersSuggestion } from '@/hooks';
import useBlockedUsers from '@/hooks/useBlockedUsers';
import useChats from '@/hooks/useChats';
import { useMemo } from 'react';

const useEnoughChats = () => {
  const realChats = useChats();
  const blockedUsers = useBlockedUsers();
  const contacts = useContacts();
  const usersSuggestion = useUsersSuggestion();

  const enoughChats = useMemo(() => {
    const chats = [...realChats]; // avoid mutating realChats

    // If chat list are not enough, add users from contact list.
    if (chats.length < 10) {
      for (const contact of contacts) {
        if (!chats.some((chat) => chat.partner.id === contact.id)) {
          chats.push({ partner: contact });
        }

        if (chats.length === 10) break;
      }
    }

    // If chat list are still not enough, add users from suggetions list.
    if (chats.length < 10) {
      for (const user of usersSuggestion) {
        const isBlocked = blockedUsers.some(
          (blockedUser) => blockedUser.id === user.id,
        );

        if (!isBlocked && !chats.some((chat) => chat.partner.id === user.id)) {
          chats.push({ partner: user });
        }

        if (chats.length === 10) break;
      }
    }

    return chats;
  }, [realChats, contacts, usersSuggestion, blockedUsers]);

  return enoughChats;
};

export default useEnoughChats;
