import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { Account } from '@/types';
import { accountFetched } from '@/features/Settings/slices/accountSlice';
import { profilePhotoAdded } from '@/features/Settings/slices/profilePhotosSlice';
import { useQuery } from '@tanstack/react-query';
import { smartFetch } from '@/utils';
import { API_BASE_URL } from '@/constants';

const useAuth = () => {
  const account = useAppSelector((state) => state.account);
  const isLoggedIn = typeof account?.id === 'number';

  const dispatch = useAppDispatch();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['account'],
    queryFn: () => smartFetch<Account>(`${API_BASE_URL}/users/me`)
  });

  useEffect(() => {
    if (data?.success) {
      dispatch(accountFetched(data.data));
      if (data.data.profilePhoto) {
        dispatch(profilePhotoAdded(data.data.profilePhoto));
      }
    }
  }, [data, dispatch]);

  if (isError) {
    console.error(error);
  }

  return {
    isLoading: isPending,
    isLoggedIn
  };
};

export default useAuth;
