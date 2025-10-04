import { useCallback, useRef } from 'react';

const useAbortController = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const prepareAbortController = useCallback(() => {
    abort(); // Abort previous request for robustness.
    abortControllerRef.current = new AbortController();
  }, [abort]);

  const getSignal = useCallback(
    // `undefined` as fallback makes easy for type safty because signal is optional in fetch api
    () => abortControllerRef.current?.signal || undefined,
    [],
  );

  return {
    prepareAbortController,
    getSignal,
    abort,
  };
};

export default useAbortController;
