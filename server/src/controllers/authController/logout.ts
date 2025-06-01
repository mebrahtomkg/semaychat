import { AUTH_TOKEN_COOKIE_NAME } from '../../constants';
import { Request, Response, NextFunction } from 'express';

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie(AUTH_TOKEN_COOKIE_NAME, '_null_', {
      expires: new Date(Date.now() + 90000000)
    });

    res.status(200).json({
      success: true,
      message: 'Successfully logout'
    });
  } catch (err) {
    next(err);
  }
};

export default logout;
