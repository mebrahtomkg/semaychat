import { User } from '@/types';
import { useCallback } from 'react';
import { CONTACTS_QUERY_KEY } from './useContacts';
import queryClient from '@/queryClient';

const useContactActions = () => {
  const addContact = useCallback((contact: User) => {
    queryClient.setQueryData([CONTACTS_QUERY_KEY], (contacts: User[]) => {
      if (!contacts) return [contact];
      return [...contacts, contact];
    });
  }, []);

  const deleteContact = useCallback((userId: number) => {
    queryClient.setQueryData([CONTACTS_QUERY_KEY], (contacts: User[]) => {
      if (!contacts) return [contacts];
      return contacts.filter((contact) => contact.id !== userId);
    });
  }, []);

  return {
    addContact,
    deleteContact,
  };
};

export default useContactActions;
