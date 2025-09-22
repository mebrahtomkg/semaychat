import { post } from '@/api';
import { useCallback } from 'react';

const useLogout = () => {
  const logout = useCallback(async () => {
    try {
      await post('/auth/logout', {});
      location.reload();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return logout;
};

export default useLogout;
