import { useContext } from 'react';
import AppContext from '../App/AppContext';
import useApp from '../App/useApp';

const useAppContext = (): ReturnType<typeof useApp> => {
  const appContext: ReturnType<typeof useApp> | null = useContext(AppContext);

  if (!appContext) throw new Error('Invalid app context!');

  return appContext;
};

export default useAppContext;
