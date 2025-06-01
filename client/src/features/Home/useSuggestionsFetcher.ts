import { useEffect, useRef, useState } from 'react';
import { useAPI, useAppDispatch } from '../../hooks';
import { User } from '../../types';
import { manyUsersAdded } from '../../usersSlice';

const useSuggestionsFetcher = () => {
  const [isFetched, setIsFetched] = useState(false);
  const fetchTriesRef = useRef<number>(0);

  const dispatch = useAppDispatch();

  const { get } = useAPI();

  useEffect(() => {
    const fetchSuggestions = async () => {
      const { success, data, message, status } =
        await get<User[]>('/users/suggestions');

      if (status && status >= 400) setIsFetched(true);

      if (success) {
        dispatch(manyUsersAdded(data));
        setIsFetched(true);
      } else {
        console.error(message);
        if (fetchTriesRef.current > 2) setIsFetched(true);
      }
      fetchTriesRef.current++;
    };

    if (!isFetched) fetchSuggestions();
  }, [dispatch, get, isFetched]);
};

export default useSuggestionsFetcher;
