import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../constants';
import isPositiveInteger from './isPositiveInteger';

/**
 * Creates auth token using jwt
 * @param userId User id to include in the token.
 * @returns Token string.
 */
const createAuthToken = (userId: number): string => {
  if (!isPositiveInteger(userId)) {
    throw Error('Cannot create auth token. Invalid userId! ');
  }

  const token = jwt.sign({ id: userId }, JWT_SECRET_KEY, {
    expiresIn: '10000h'
  });

  return token;
};

export default createAuthToken;
