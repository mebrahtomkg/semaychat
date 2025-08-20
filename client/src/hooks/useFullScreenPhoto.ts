import { useCallback, useState } from 'react';

const useFullScreenPhoto = () => {
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);

  const toggleFullScreenMode = useCallback(
    () => setIsFullScreenMode((prevValue) => !prevValue),
    [],
  );

  const exitFullScreenMode = useCallback(() => setIsFullScreenMode(false), []);

  return { isFullScreenMode, toggleFullScreenMode, exitFullScreenMode };
};

export default useFullScreenPhoto;
