import { useEffect, useState } from 'react';
import { useAPI, useAppDispatch, useAppSelector } from '.';
import { User } from '../types';
import { manyUsersAdded } from '../usersSlice';
import { blockedUsersFetched } from '../blockedUsersSlice';

const useBlockedUsersFetcher = () => {
  const account = useAppSelector((state) => state.account);

  const isLoggedIn = account?.id;

  const [isFetched, setIsFetched] = useState(false);

  const dispatch = useAppDispatch();

  const { get } = useAPI();

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      const { success, data, message, status } =
        await get<User[]>('/blocked-users');

      if (success) {
        const blockedUsers = data.map((user) => user.id);
        dispatch(blockedUsersFetched(blockedUsers));
        dispatch(manyUsersAdded(data));
      } else {
        console.error(message);
      }

      if (success || (status && status >= 400)) setIsFetched(true);
    };

    if (isLoggedIn && !isFetched) fetchBlockedUsers();
  }, [dispatch, get, isFetched, isLoggedIn]);
};

export default useBlockedUsersFetcher;
