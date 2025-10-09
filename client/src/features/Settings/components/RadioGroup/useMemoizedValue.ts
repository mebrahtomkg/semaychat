import { deepEqual } from '@/utils';
import { useRef } from 'react';

const useMemoizedValue = <T = unknown>(value: T): T => {
  const valueRef = useRef<T>(value);

  if (!deepEqual(value, valueRef.current)) {
    valueRef.current = value;
  }

  return valueRef.current;
};

export default useMemoizedValue;
