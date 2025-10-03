import { useContacts } from '@/hooks';
import { User } from '@/types';
import { InputEventHandler, useCallback, useEffect, useState } from 'react';

const useSearchContacts = () => {
  const contacts = useContacts();
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleSearchInputChange: InputEventHandler<HTMLInputElement> =
    useCallback((e) => {
      const { value } = e.currentTarget;
      setQuery(value.trim().toLowerCase());
    }, []);

  useEffect(() => {
    const result: User[] = [];

    contacts.forEach((contact) => {
      if (contact.firstName.toLowerCase().startsWith(query)) {
        result.push(contact);
      }
    });

    setSearchResults(result);
  }, [query, contacts]);

  const isSearchMode = !!query;

  return { handleSearchInputChange, isSearchMode, searchResults };
};

export default useSearchContacts;
