import { useEffect, useRef, useState } from 'react';
import { useAPI } from '@/hooks';
import { ProfilePhoto } from '@/types';

const useProfilePhotosFetcher = (userId?: number) => {
  const [profilePhotos, setProfilePhotos] = useState<ProfilePhoto[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const fetchTriesRef = useRef<number>(0);

  const { get } = useAPI();

  useEffect(() => {
    const fetchPhotos = async () => {
      const { success, data, message } = await get<ProfilePhoto[]>(
        `/profile-photos/user/${userId}`
      );

      if (success) {
        setProfilePhotos(data);
        setIsFetched(true);
      } else {
        console.error(message);
        if (fetchTriesRef.current > 2) setIsFetched(true);
      }
      fetchTriesRef.current++;
    };

    if (!isFetched && userId) fetchPhotos();
  }, [get, isFetched, userId]);

  return profilePhotos;
};

export default useProfilePhotosFetcher;
