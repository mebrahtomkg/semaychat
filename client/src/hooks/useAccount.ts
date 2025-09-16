import { useAccountQuery } from '.';

// This custom hook must be used only if user is loggedin(logical flow after auth)
const useAccount = () => {
  const { account } = useAccountQuery();

  if (!account) throw new Error('Invalid account! You maynot loggedin!');

  return account;
};

export default useAccount;
