import { Account } from '@/types';
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
  useAccountUpdateRequestStore.setState((prevRequest) => {
    const id = getUniqueId();
    if (!prevRequest) return { id, payload };
    return { id, payload: { ...prevRequest.payload, ...payload } };
  }, true);
};

export const deleteAccountUpdateRequest = () => {
  useAccountUpdateRequestStore.setState(() => null, true);
};

export default useAccountUpdateRequestStore;
