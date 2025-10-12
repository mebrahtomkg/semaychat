import { QUERY_KEY_ACCOUNT } from '@/constants';
import queryClient from '@/queryClient';
import { Account } from '@/types';
import { deepEqual } from '@/utils';
import { create } from 'zustand';

let lastUniqueId = 0;
const getUniqueId = () => ++lastUniqueId;

export interface AccountUpdateRequest {
  id: number;
  payload: Partial<
    Pick<
      Account,
      | 'firstName'
      | 'lastName'
      | 'bio'
      | 'emailVisibility'
      | 'lastSeenVisibility'
      | 'profilePhotosVisibility'
      | 'messageSender'
    >
  >;
}

const useAccountUpdateRequestStore = create<AccountUpdateRequest | null>(
  () => null,
);

export const addAccountUpdateRequest = (
  payload: AccountUpdateRequest['payload'],
) => {
  const account = queryClient.getQueryData<Account>([QUERY_KEY_ACCOUNT]);

  // If this payload does not bring any new update do not dispatch
  if (account && deepEqual(account, { ...account, ...payload })) return;

  useAccountUpdateRequestStore.setState((prevRequest) => {
    const data = prevRequest ? { ...prevRequest.payload, ...payload } : payload;
    queryClient.setQueryData([QUERY_KEY_ACCOUNT], (oldAccount) =>
      oldAccount ? { ...oldAccount, ...data } : undefined,
    );
    return { id: getUniqueId(), payload: data };
  }, true);
};

export const deleteAccountUpdateRequest = () => {
  useAccountUpdateRequestStore.setState(() => null, true);
};

export default useAccountUpdateRequestStore;
