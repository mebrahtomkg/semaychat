import { useContacts } from '@/hooks';
import useChats from '@/hooks/useChats';
import { Chat } from '@/types';
import { InputEventHandler, useCallback, useEffect, useState } from 'react';
import useEnoughChats from './useEnoughChats';

const useSearch = () => {
  const chats = useEnoughChats();
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Chat[]>([]);

  const handleSearchInputChange: InputEventHandler<HTMLInputElement> =
    useCallback((e) => {
      const value = e.currentTarget.value;
      setQuery(value.trim().toLowerCase());
    }, []);

  useEffect(() => {
    const result: Chat[] = [];

    chats.forEach((chat) => {
      if (chat.partner.firstName.toLowerCase().startsWith(query)) {
        result.push(chat);
      }
    });

    setSearchResults(result);
  }, [query, chats]);

  const isSearchMode = !!query;

  return { handleSearchInputChange, isSearchMode, searchResults };
};

export default useSearch;
