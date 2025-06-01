import bcrypt from 'bcryptjs';

/**
 * Compares the given password against the given hash.
 *
 * @param password  The password.
 * @param hash      The hash.
 * @returns         A promise that will be resolved to boolean, i.e true if
 *                  matching, otherwise false.
 */
const verifyPassword = (password: string, hash: string) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(password, hash, (error, res) => {
      if (error) {
        reject(error);
      } else {
        resolve(res);
      }
    })
  );
};

export default verifyPassword;
