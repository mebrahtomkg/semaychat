import { useContacts } from '@/hooks';
import useChats from '@/hooks/useChats';
import { Chat } from '@/types';
import { InputEventHandler, useCallback, useEffect, useState } from 'react';

const useSearch = () => {
  const chats = useChats();
  const contacts = useContacts();

  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Chat[]>([]);

  const handleSearchInputChange: InputEventHandler<HTMLInputElement> =
    useCallback((e) => {
      const { value } = e.currentTarget;
      setQuery(value.trim().toLowerCase());
    }, []);

  useEffect(() => {
    const result: Chat[] = [];

    chats.forEach((chat) => {
      if (chat.partner.firstName.toLowerCase().startsWith(query)) {
        result.push(chat);
      }
    });

    contacts.forEach((contact) => {
      if (
        contact.firstName.toLowerCase().startsWith(query) &&
        !result.some((chat) => chat.partner.id === contact.id)
      ) {
        result.push({ partner: contact });
      }
    });

    setSearchResults(result);
  }, [query, chats, contacts]);

  const isSearchMode = !!query;

  return { handleSearchInputChange, isSearchMode, searchResults };
};

export default useSearch;
