import { PASSWORD_HASHING_ROUNDS } from '@/config/general';
import bcrypt from 'bcryptjs';

/**
 * Generates a hash for the given password.
 *
 * @param password  The password.
 * @returns         A promise that will be resolved to string, i.e Resulting hash
 *                  of the password.
 */
const hashPassword = (password: string) => {
  return new Promise<string>((resolve, reject) =>
    bcrypt.hash(password, PASSWORD_HASHING_ROUNDS, (error, hash) => {
      if (error) {
        reject(error);
      } else {
        resolve(hash as string);
      }
    }),
  );
};

export default hashPassword;
