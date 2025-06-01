import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const useRouteTracker = () => {
  const location = useLocation();

  const [previousPath, setPreviousPath] = useState<string>(location.pathname);
  const [currentPath, setCurrentPath] = useState<string>(location.pathname);

  useEffect(() => {
    if (location.pathname !== currentPath) {
      setPreviousPath(currentPath);
      setCurrentPath(location.pathname);
    }
  }, [currentPath, location.pathname]);

  return { currentPath, previousPath };
};

export default useRouteTracker;
