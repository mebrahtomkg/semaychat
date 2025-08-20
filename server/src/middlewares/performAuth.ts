import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AUTH_TOKEN_COOKIE_NAME, JWT_SECRET_KEY } from '@/config/general';

interface AuthTokenBody {
  id: number;
}

/**
 * Middleware to perform auth gracefully without showing errors.
 * Sets req.userId to the Authenticated user id.
 */
const performAuth = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[AUTH_TOKEN_COOKIE_NAME];

    if (!token) {
      next();
      return;
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    jwt.verify(token, JWT_SECRET_KEY, (error: any, decoded: any) => {
      // Other codes in the system can know if the user is loggedin
      // by checking the existance of userId property on req object.
      if (!error) {
        req.userId = (decoded as AuthTokenBody).id;
      }

      next();
    });
  } catch (err) {
    next(err);
  }
};

export default performAuth;
