import { QUERY_KEY_ACCOUNT } from '@/constants';
import { Account } from '@/types';
import queryClient from './queryClient';

const accountCache = {
  get: () => {
    const account = queryClient.getQueryData<Account>([QUERY_KEY_ACCOUNT]);
    if (!account) throw new Error('Invalid account! You maynot have loggedin!');
    return account;
  },
};

export default accountCache;
