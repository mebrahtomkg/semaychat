import { useEffect, useState } from 'react';
import { useAPI, useAppDispatch } from '.';
import { Message } from '../types';
import { manyMessagesAdded } from '../features/Chat/slices/messagesSlice';

const useMessagesFetcher = (partnerId: number) => {
  const [isFetched, setIsFetched] = useState(false);

  const dispatch = useAppDispatch();

  const { get } = useAPI();

  useEffect(() => {
    const fetchMessages = async () => {
      const { success, data, message, status } = await get<Message[]>(
        `/messages/${partnerId}`
      );

      if (success) {
        dispatch(manyMessagesAdded(data));
      } else {
        console.error(message);
      }

      if (success || (status && status >= 400)) setIsFetched(true);
    };

    if (!isFetched) fetchMessages();
  }, [dispatch, get, isFetched, partnerId]);
};

export default useMessagesFetcher;
