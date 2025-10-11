import { deepEqual } from '@/utils';
import { useRef } from 'react';

const useIsChanged = (value: unknown) => {
  const oldValue = useRef<unknown | null>(null);

  const isChanged = !deepEqual(value, oldValue.current);

  oldValue.current = value;

  return isChanged;
};

export default useIsChanged;
