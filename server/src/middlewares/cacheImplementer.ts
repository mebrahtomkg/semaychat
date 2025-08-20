import { Request, Response, NextFunction } from 'express';

const cacheImplementer = (req: Request, res: Response, next: NextFunction) => {
  res.header('Cache-Control', 'public, max-age=31536000');
  next();
};

export default cacheImplementer;
