import { useEffect, useRef, useState } from 'react';
import { useAPI, useAppDispatch, useAppSelector } from '.';
import { userAdded } from '../usersSlice';
import { User } from '../types';

const useUserFetcher = (userId: number) => {
  const users = useAppSelector((state) => state.users);

  const user = users.find((user) => user.id === userId);

  const [isFetched, setIsFetched] = useState(typeof user?.id === 'number');
  const fetchTriesRef = useRef<number>(0);

  const dispatch = useAppDispatch();

  const { get } = useAPI();

  useEffect(() => {
    const fetchUser = async () => {
      const { success, data, message } = await get<User>(`/users/${userId}`);
      if (success) {
        dispatch(userAdded(data));
        setIsFetched(true);
      } else {
        console.error(message);
        if (fetchTriesRef.current === 2) setIsFetched(true);
      }
      fetchTriesRef.current++;
    };

    if (!isFetched) fetchUser();
  }, [dispatch, get, isFetched, userId]);

  return user;
};

export default useUserFetcher;
