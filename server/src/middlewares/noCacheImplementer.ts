import { Request, Response, NextFunction } from 'express';

const noCacheImplementer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
};

export default noCacheImplementer;
