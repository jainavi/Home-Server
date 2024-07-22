import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { AppError } from '../utils/errors';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const firstError = validationErrors.array()[0] as ValidationError & {
      param: string;
    };
    throw new AppError(firstError.msg, { feild: firstError.param }, 400);
  }

  next();
};

export const requiredFile = (single: boolean = true) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (single && !req.file) throw new AppError('File is Required');
    if (!single && !req.files) throw new AppError('Files are Required');
    next();
  };
};
