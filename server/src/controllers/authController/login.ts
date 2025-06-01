import { checkEmail, checkPassword } from './utils';
import { createAuthToken, filterUserData, verifyPassword } from '../../utils';
import { AUTH_TOKEN_COOKIE_NAME, AUTH_TOKEN_AGE } from '../../constants';
import { User } from '../../models';
import { Request, Response, NextFunction } from 'express';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // if (req.userId) {
    //   return res.status(400).json({
    //     message: 'You are already logged in'
    //   });
    // }

    const { body } = req;

    const email = typeof body.email === 'string' ? body.email.trim() : null;

    if (!checkEmail(email)) {
      return res.status(400).json({
        message: 'Invalid email'
      });
    }

    const password =
      typeof body.password === 'string' ? body.password.trim() : null;

    if (!checkPassword(password)) {
      return res.status(400).json({
        message: 'Invalid password'
      });
    }

    const user = await User.scope('withProfilePhoto').findOne({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
        message: 'No user found with the specified email.'
      });
    }

    if (!(await verifyPassword(password, user.password))) {
      return res.status(401).json({
        message: 'Incorrect password!'
      });
    }

    const token = createAuthToken(user.id);

    res.cookie(AUTH_TOKEN_COOKIE_NAME, token, {
      expires: new Date(Date.now() + AUTH_TOKEN_AGE)
    });

    res.status(200).json({
      success: true,
      data: filterUserData(user.toJSON()),
      message: 'Login successful'
    });
  } catch (err) {
    next(err);
  }
};

export default login;
