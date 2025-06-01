import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_COOKIE_NAME, JWT_SECRET_KEY } from '../constants';
import { Request, Response, NextFunction } from 'express';

interface AuthTokenBody {
  id: number;
}

/**
 * Middleware to perform auth gracefully without showing errors.
 * Sets req.userId to the Authenticated user id.
 *
 * @param req
 * @param res
 * @param next
 */
const performAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[AUTH_TOKEN_COOKIE_NAME];

    if (!token) return next();

    jwt.verify(token, JWT_SECRET_KEY, (error: Error, decoded: AuthTokenBody) => {
      if (error) return next();

      // Other codes in the system can know if the user is loggedin
      // by checking the existance of userId property on req object.
      req.userId = decoded.id;

      next();
    });
  } catch (err) {
    next(err);
  }
};

export default performAuth;
