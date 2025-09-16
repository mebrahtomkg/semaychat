import { useAccountQuery } from '.';

const useAuth = () => {
  const { isPending, account } = useAccountQuery();

  return {
    isLoading: isPending,
    isLoggedIn: typeof account?.id === 'number',
  };
};

export default useAuth;
