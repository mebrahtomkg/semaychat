import { checkEmail, checkPassword } from './utils';
import {
  AUTH_TOKEN_COOKIE_NAME,
  AUTH_TOKEN_AGE,
  IS_PRODUCTION,
} from '@/config/general';
import { User } from '@/models';
import { createAuthToken, filterUserData, verifyPassword } from '@/utils';
import { Request, Response, NextFunction } from 'express';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userId) {
      res.status(400).json({
        message: 'You are already logged in',
      });
      return;
    }

    const { body } = req;

    const email = typeof body?.email === 'string' ? body.email.trim() : null;

    if (!checkEmail(email)) {
      res.status(400).json({
        message: 'Invalid email',
      });
      return;
    }

    const password =
      typeof body.password === 'string' ? body.password.trim() : null;

    if (!checkPassword(password)) {
      res.status(400).json({
        message: 'Invalid password',
      });
      return;
    }

    const user = await User.scope('withProfilePhoto').findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({
        message: 'No user found with the specified email.',
      });
      return;
    }

    if (!(await verifyPassword(password, user.password))) {
      res.status(401).json({
        message: 'Incorrect password!',
      });
      return;
    }

    const token = createAuthToken(user.id);

    res.cookie(AUTH_TOKEN_COOKIE_NAME, token, {
      expires: new Date(Date.now() + AUTH_TOKEN_AGE),
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: IS_PRODUCTION ? 'none' : 'lax',
    });

    res.status(200).json({
      success: true,
      data: filterUserData(user.toJSON()),
      message: 'Login successful',
    });
  } catch (err) {
    next(err);
  }
};

export default login;
