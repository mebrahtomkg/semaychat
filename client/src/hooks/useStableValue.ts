import { deepEqual } from '@/utils';
import { useRef } from 'react';

/**
 * Stabilizes the reference of a value (typically an object or array) based on deep content equality.
 *
 * This hook is essential for scenarios where an object literal or array is created on every render,
 * but its content often remains the same. By using `deepEqual`, it ensures that the
 * returned reference remains stable unless the underlying data structure changes deeply.
 *
 * This prevents unnecessary re-runs of hooks that depend on this value (e.g., in
 * `useEffect` or `useMemo` dependency arrays),
 * thereby optimizing performance and avoiding potential infinite loops caused by
 * unstable object dependencies.
 *
 * @param value The value (object, array, or primitive) to stabilize.
 * @returns A stable reference to the value, updated only if the content changes deeply.
 */
const useStableValue = <T = unknown>(value: T): T => {
  const valueRef = useRef<T>(value);

  if (!deepEqual(value, valueRef.current)) {
    valueRef.current = value;
  }

  return valueRef.current;
};

export default useStableValue;
