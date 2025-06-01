import { useEffect, useRef, useState } from 'react';
import { useAPI, useAppDispatch, useAppSelector } from '.';
import { Account } from '../types';
import { accountFetched } from '../features/Settings/slices/accountSlice';
import { profilePhotoAdded } from '../features/Settings/slices/profilePhotosSlice';

const useAuth = () => {
  const account = useAppSelector((state) => state.account);
  const isLoggedIn = account && typeof account.id === 'number';

  const [isFetched, setIsFetched] = useState(false);
  const fetchTriesRef = useRef<number>(0);

  const dispatch = useAppDispatch();

  const { get } = useAPI();

  useEffect(() => {
    const fetchAuthData = async () => {
      const { success, data, message, status } =
        await get<Account>('/users/me');
      if (status === 401) setIsFetched(true);
      if (success) {
        dispatch(accountFetched(data));
        if (data.profilePhoto) dispatch(profilePhotoAdded(data.profilePhoto));
        setIsFetched(true);
      } else {
        console.error(message);
        if (fetchTriesRef.current > 2) setIsFetched(true);
      }
      fetchTriesRef.current++;
    };

    if (!isLoggedIn && !isFetched) fetchAuthData();
  }, [dispatch, get, isFetched, isLoggedIn]);

  return {
    isLoading: !isFetched,
    isLoggedIn
  };
};

export default useAuth;
