import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { Account } from '@/types';
import { accountFetched } from '@/features/Settings/slices/accountSlice';
import { profilePhotoAdded } from '@/features/Settings/slices/profilePhotosSlice';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';

const useAuth = () => {
  const account = useAppSelector((state) => state.account);

  const dispatch = useAppDispatch();
 
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['account'],
    queryFn: () => get<Account>(`/users/me`),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status === 401
        ? false
        : failureCount < 2
  });

  useEffect(() => {
    if (data) {
      dispatch(accountFetched(data));
      if (data.profilePhoto) {
        dispatch(profilePhotoAdded(data.profilePhoto));
      }
    }
  }, [data, dispatch]);

  if (isError) {
    console.error(error);
  }

  return {
    isLoading: isPending,
    isLoggedIn: typeof account?.id === 'number'
  };
};

export default useAuth;
