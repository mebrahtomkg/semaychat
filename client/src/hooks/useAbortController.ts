import { useCallback, useRef } from 'react';

const useAbortController = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const recreateAbortController = useCallback(() => {
    const ac = new AbortController();
    abortControllerRef.current = ac;
    return ac;
  }, []);

  const abort = useCallback(() => abortControllerRef.current?.abort(), []);

  return {
    recreateAbortController,
    abort,
  };
};

export default useAbortController;
