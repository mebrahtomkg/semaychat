/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 * It handles primitives, arrays, and nested plain objects.
 *
 * @param valueOne The first value to compare.
 * @param valueTwo The second value to compare.
 * @returns True if the values are deeply equal, false otherwise.
 */
const deepEqual = (valueOne: unknown, valueTwo: unknown): boolean => {
  if (valueOne === valueTwo) return true;

  const areObjects =
    typeof valueOne === 'object' &&
    typeof valueTwo === 'object' &&
    valueOne !== null &&
    valueTwo !== null;

  if (!areObjects) return false;

  // Handle Array compare
  if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
    if (valueOne.length !== valueTwo.length) return false;
    for (let i = 0; i < valueOne.length; i++) {
      if (!deepEqual(valueOne[i], valueTwo[i])) return false;
    }
    return true;
  }

  // If one is an array and the other isn't, they are unequal.
  if (Array.isArray(valueOne) || Array.isArray(valueTwo)) {
    return false;
  }

  // Handle object compare
  const objOne = valueOne as Record<string, unknown>;
  const objTwo = valueTwo as Record<string, unknown>;
  const objOneKeys = Object.keys(objOne);
  if (objOneKeys.length !== Object.keys(objTwo).length) return false;
  for (const key of objOneKeys) {
    if (!Object.hasOwn(objTwo, key)) return false;
    if (!deepEqual(objOne[key], objTwo[key])) return false;
  }
  return true;
};

export default deepEqual;
