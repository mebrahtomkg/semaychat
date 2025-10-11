import { ApiError, put } from '@/api';
import { QUERY_KEY_ACCOUNT } from '@/constants';
import { useAbortController, useStableValue } from '@/hooks';
import queryClient from '@/queryClient';
import useAccountUpdateRequestStore, {
  AccountUpdateRequest,
  deleteAccountUpdateRequest,
} from '@/store/useAccountUpdateRequestStore';
import { Account } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

const AccountUpdateProcessor = () => {
  const { prepareAbortController, getSignal, abort } = useAbortController();
  const request = useStableValue(useAccountUpdateRequestStore());
  const inServerAccountRef = useRef<Account>(
    queryClient.getQueryData([QUERY_KEY_ACCOUNT]) as Account, // Loggedin user always have account
  );

  const { mutate, variables } = useMutation({
    mutationFn: (req: AccountUpdateRequest) => {
      prepareAbortController(); // This will abort previous request and create new controller.
      return put<Account>('/users/me', req.payload, { signal: getSignal() });
    },
    retry: (_failureCount: number, error: Error) => {
      // No retry if the request was aborted
      if (error.name === 'AbortError') return false;
      // No retry if the error is api error such as 400, 401, ..500
      if (error instanceof ApiError && error.status) {
        return false;
      }
      return true;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_ACCOUNT] });
    },
    onError(error, _req) {
      if (error instanceof ApiError && error.status) {
        // Delete any existing request. even if it is new request as it may hold the error
        // causing account update data due to deduplication made by store
        deleteAccountUpdateRequest();

        // Rolling back to in server pure account! because previous query data
        // can be stale and incorrect due to the deduplication and merging made by the store
        queryClient.setQueryData<Account>(
          [QUERY_KEY_ACCOUNT],
          inServerAccountRef.current,
        );
      }
    },
    onSuccess: (data, req) => {
      inServerAccountRef.current = data;
      const inStoreRequest = useAccountUpdateRequestStore.getState();
      queryClient.setQueryData<Account>([QUERY_KEY_ACCOUNT], () => {
        // If there is a new request in store, do merge for optimistic update.
        if (inStoreRequest && inStoreRequest.id !== req.id) {
          return { ...data, ...inStoreRequest.payload };
        }
        return data;
      });
      // If the curently processed request is in store, delete it
      if (inStoreRequest && inStoreRequest.id === req.id) {
        deleteAccountUpdateRequest();
      }
      console.info('[****]Account Updated');
    },
  });

  useEffect(() => {
    if (request) {
      queryClient.setQueryData([QUERY_KEY_ACCOUNT], (oldAccount) => {
        if (!oldAccount) return undefined;
        return { ...oldAccount, ...request.payload };
      });
    }
  }, [request]);

  useEffect(() => {
    if (request && variables?.id !== request.id) {
      abort();
      mutate(request);
    }
  }, [request, variables?.id, abort, mutate]);

  return null;
};

export default AccountUpdateProcessor;
