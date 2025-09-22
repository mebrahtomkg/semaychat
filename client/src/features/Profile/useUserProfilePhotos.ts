import { ProfilePhoto } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';

const useUserProfilePhotos = (userId: number) => {
  const endpoint = `/profile-photos/user/${userId}`;

  const { isError, data, error } = useQuery({
    queryKey: [endpoint],
    queryFn: () => get<ProfilePhoto[]>(endpoint),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  if (isError) {
    console.error(error);
  }

  return data || [];
};

export default useUserProfilePhotos;
