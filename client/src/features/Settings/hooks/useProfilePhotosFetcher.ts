import { useEffect, useRef, useState } from 'react';
import { useAPI, useAppDispatch } from '../../../hooks';
import { profilePhotosFetched } from '../slices/profilePhotosSlice';
import { ProfilePhoto } from '../../../types';

const useProfilePhotosFetcher = () => {
  const [isFetched, setIsFetched] = useState(false);
  const fetchTriesRef = useRef<number>(0);

  const dispatch = useAppDispatch();

  const { get } = useAPI();

  useEffect(() => {
    const fetchPhotos = async () => {
      const { success, data, message } =
        await get<ProfilePhoto[]>('/profile-photos/me');

      if (success) {
        dispatch(profilePhotosFetched(data));
        setIsFetched(true);
      } else {
        console.error(message);
        if (fetchTriesRef.current > 2) setIsFetched(true);
      }

      fetchTriesRef.current++;
    };

    if (!isFetched) fetchPhotos();
  }, [dispatch, get, isFetched]);
};

export default useProfilePhotosFetcher;
