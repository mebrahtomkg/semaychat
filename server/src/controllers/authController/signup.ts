import { AUTH_TOKEN_AGE, AUTH_TOKEN_COOKIE_NAME, IS_PRODUCTION } from '../../constants';
import User from '../../models/User';
import { createAuthToken, filterUserData, hashPassword } from '../../utils';
import { checkEmail, checkFirstName, checkPassword } from './utils';
import { Request, Response, NextFunction } from 'express';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userId) {
      return res.status(400).json({
        message: 'You are already signedup'
      });
    }

    const { body } = req;

    const firstName =
      typeof body.firstName === 'string' ? body.firstName.trim() : null;

    if (!checkFirstName(firstName)) {
      return res.status(400).json({
        message: 'Invalid Name.'
      });
    }

    const email = typeof body.email === 'string' ? body.email.trim() : null;

    if (!checkEmail(email)) {
      return res.status(400).json({
        message: 'Invalid Email.'
      });
    }

    const password =
      typeof body.password === 'string' ? body.password.trim() : null;

    if (!checkPassword(password)) {
      return res.status(400).json({
        message: 'Password invalid or too short.'
      });
    }

    if (await User.findOne({ where: { email } })) {
      return res.status(409).json({
        message: 'The eamil already exists.'
      });
    }

    const pwdHash = await hashPassword(password);

    const user = await User.create({ email, password: pwdHash, firstName });

    const token = createAuthToken(user.id);

    res.cookie(AUTH_TOKEN_COOKIE_NAME, token, {
      expires: new Date(Date.now() + AUTH_TOKEN_AGE),
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: IS_PRODUCTION ? 'none' : 'lax',
      domain: IS_PRODUCTION ? '.onrender.com' : undefined
    });

    res.status(200).json({
      success: true,
      data: filterUserData(user.toJSON()),
      message: 'Signup successful'
    });
  } catch (err) {
    next(err);
  }
};

export default signup;
