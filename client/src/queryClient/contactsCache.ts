import { QUERY_KEY_CONTACTS } from '@/constants';
import { User } from '@/types';
import queryClient from './queryClient';

const setCache = (setterFn: (contacts: User[]) => User[]) => {
  queryClient.setQueryData<User[]>([QUERY_KEY_CONTACTS], (contacts) =>
    setterFn(contacts || []),
  );
};

const contactsCache = {
  add: (contact: User) => {
    setCache((contacts) => [...contacts, contact]);
  },

  handleContactConnect: (contactId: number) => {
    setCache((contacts) =>
      contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              isOnline: true,
            }
          : contact,
      ),
    );
  },

  handleContactDisconnect: (contactId: number, lastSeenTime?: number) => {
    setCache((contacts) =>
      contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              isOnline: false,
              lastSeenAt: lastSeenTime,
            }
          : contact,
      ),
    );
  },
};

export default contactsCache;
