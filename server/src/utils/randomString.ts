import { randomBytes } from 'node:crypto';
import isPositiveInteger from './isPositiveInteger';

/**
 * Generates cryptographically strong pseudorandom data. The size argument is a
 * number indicating the number of bytes to generate.
 *
 * @param size  The number of bytes to generate.
 * @returns     A promise that will be resolved to a Buffer holding the generated random bytes.
 */
const getRandomBytes = (size: number): Promise<Buffer> => {
  if (!isPositiveInteger(size)) {
    throw new Error('Cannot generate random bytes. Invalid size value!');
  }

  return new Promise((resolve, reject) =>
    randomBytes(size, (error, buf) => {
      if (error) {
        reject(error);
      } else {
        resolve(buf);
      }
    }),
  );
};

const AZaz09 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Domain of characters for random string generator.
 *
 * [A-Za-z0-9] = 62 chars
 * [A-G] = 8 chars
 * 4 * [a-zA-Z0-9] + [A-Z] = 256 chars
 */
const DOMAIN: string[] = (AZaz09 + AZaz09 + AZaz09 + AZaz09 + 'ABCDEFGH').split(
  '',
);

/**
 * Generates cryptographically strong pseudorandom string. The length argument is a
 * number indicating length of the string to be generated.
 *
 * The generated string's characters will be only in the domain of [A-Za-z0-9].
 *
 * @param length  Length of the string to be generated.
 * @returns  A promise that resolves to a String, i.e the generated random string.
 */
const randomString = async (length: number) => {
  if (!isPositiveInteger(length)) {
    throw Error('Cannot generate random string. Invalid length value!');
  }

  const bytes = await getRandomBytes(length);

  let str = '';
  for (const b of bytes) {
    str += DOMAIN[b];
  }

  return str;
};

export default randomString;
