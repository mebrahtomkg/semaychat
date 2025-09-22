import { useCallback } from 'react';
import useAPI from './useAPI';

const useLogout = () => {
  const { post } = useAPI();

  const logout = useCallback(async () => {
    const { success, message } = await post('/auth/logout', {});

    if (success) {
      location.reload();
    } else {
      console.error(message);
    }
  }, [post]);

  return logout;
};

export default useLogout;
