import useMessageRequestsStore from '@/store/useMessageRequestsStore';
import { MessageRequest } from '@/types';
import { deepEqual } from '@/utils';
import { useCallback, useEffect, useState } from 'react';

const useMessageRequests = <SelectorOutput>(
  selector: (requests: MessageRequest[]) => SelectorOutput,
) => {
  const initialValue = selector(useMessageRequestsStore.getState());

  const [value, setValue] = useState<SelectorOutput>(initialValue);

  const storeListener = useCallback(
    (requests: MessageRequest[], prevRequests: MessageRequest[]) => {
      const newValue = selector(requests);
      const prevValue = selector(prevRequests);
      if (!deepEqual(newValue, prevValue)) {
        setValue(newValue);
      }
    },
    [selector],
  );

  useEffect(() => {
    const unsubscribe = useMessageRequestsStore.subscribe(storeListener);
    return unsubscribe;
  }, [storeListener]);

  // BUG FIX: If the selector is changed in anyway, update the value based on the selector.
  useEffect(() => {
    setValue((prevValue) => {
      const newValue = selector(useMessageRequestsStore.getState());
      return deepEqual(newValue, prevValue) ? prevValue : newValue;
    });
  }, [selector]);

  return value;
};

export default useMessageRequests;
