import { User } from '@/models';
import { Request, Response, NextFunction } from 'express';
import { createAuthToken, filterUserData } from '@/utils';
import {
  AUTH_TOKEN_AGE,
  AUTH_TOKEN_COOKIE_NAME,
  IS_PRODUCTION,
} from '@/config/general';
import { signUpSchema } from '@/schemas';
import { createNewUser } from '@/services';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userId) {
      res.status(400).json({
        message: 'You are already signedup',
      });
      return;
    }

    const parseResult = signUpSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: parseResult.error.issues[0].message,
      });
      return;
    }

    if (await User.findOne({ where: { email: parseResult.data.email } })) {
      res.status(409).json({
        message: 'The eamil already exists.',
      });
      return;
    }

    const user = await createNewUser(parseResult.data);

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
      message: 'Signup successful',
    });
  } catch (err) {
    next(err);
  }
};

export default signup;
