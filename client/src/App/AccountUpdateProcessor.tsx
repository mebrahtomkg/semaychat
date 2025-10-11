import { ApiError, put } from '@/api';
import { QUERY_KEY_ACCOUNT } from '@/constants';
import { useAbortController, useIsChanged } from '@/hooks';
import queryClient from '@/queryClient';
import useAccountUpdateRequestStore, {
  AccountUpdateRequest,
  deleteAccountUpdateRequest,
} from '@/store/useAccountUpdateRequestStore';
import { Account } from '@/types';
import { useMutation } from '@tanstack/react-query';

const AccountUpdateProcessor = () => {
  const { prepareAbortController, getSignal, abort } = useAbortController();
  const request = useAccountUpdateRequestStore();
  const isRequestChanged = useIsChanged(request);

  const { mutate } = useMutation({
    mutationFn: (req: AccountUpdateRequest) => {
      prepareAbortController(); // This will abort previous request and create new controller.
      return put<Account>('/users/me', req.payload, { signal: getSignal() });
    },
    onSuccess: (data, req, _context) => {
      // If there is no request in the store, or if the processed request is the
      // request in the store delete the request from store and update query data.
      if (!request || req.id === request?.id) {
        deleteAccountUpdateRequest();
        queryClient.setQueryData([QUERY_KEY_ACCOUNT], () => data);
        console.info('[****]Account Updated');
      }
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
  });

  const doUpdate = async () => {
    if (!request) return;

    // Immediately update query data instead of waiting mutation life cycles
    queryClient.setQueryData([QUERY_KEY_ACCOUNT], (oldAccount) => {
      if (!oldAccount) return undefined; // doesn't happen in reality
      return { ...oldAccount, ...request.payload };
    });

    // Abort current ongoing requests
    abort();
    await queryClient.cancelQueries({ queryKey: [QUERY_KEY_ACCOUNT] });

    mutate(request);
  };

  if (isRequestChanged && request) doUpdate();

  return null;
};

export default AccountUpdateProcessor;
