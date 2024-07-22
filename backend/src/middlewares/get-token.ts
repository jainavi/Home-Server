import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/errors';

export default (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['x-client-token'];
  if (!token) throw new AppError('Token not provided', undefined, 401);

  req.token = Array.isArray(token) ? token[0] : token;
  next();
};
