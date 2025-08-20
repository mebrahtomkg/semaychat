const isPositiveInteger = (value: unknown) =>
  typeof value === 'number' && Number.isInteger(value) && value > 0;

export default isPositiveInteger;
