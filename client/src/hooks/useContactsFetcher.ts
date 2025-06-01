import { useEffect, useState } from 'react';
import { useAPI, useAppDispatch, useAppSelector } from '.';
import { User } from '../types';
import { contactsFetched } from '../contactsSlice';
import { manyUsersAdded } from '../usersSlice';

const useContactsFetcher = () => {
  const account = useAppSelector((state) => state.account);

  const isLoggedIn = account?.id;

  const [isFetched, setIsFetched] = useState(false);

  const dispatch = useAppDispatch();

  const { get } = useAPI();

  useEffect(() => {
    const fetchContacts = async () => {
      const { success, data, message, status } = await get<User[]>('/contacts');

      if (success) {
        const contacts = data.map((user) => user.id);
        dispatch(contactsFetched(contacts));
        dispatch(manyUsersAdded(data));
      } else {
        console.error(message);
      }

      if (success || (status && status >= 400)) setIsFetched(true);
    };

    if (isLoggedIn && !isFetched) fetchContacts();
  }, [dispatch, get, isFetched, isLoggedIn]);
};

export default useContactsFetcher;
