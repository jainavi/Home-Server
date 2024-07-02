import express, { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';
import logger from '../utils/logger';
import { HttpStatusCode } from '../utils/enums';

const errorHandler =  (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, stack } = err;
  const {
    httpCode = 500,
    status = 'Internal Server Error',
    isOperational = false,
  } = err instanceof AppError ? err : {};

  logger.error(err);

  if (process.env.NODE_ENV === 'production') {
    if (!isOperational) {
      return res.status(httpCode).json({
        message: 'Something went wrong',
        status,
      });
    }

    return res.status(httpCode).json({
      message,
      status,
    });
  }

  return res.status(httpCode).json({
    message,
    status,
    stack,
    err,
  });
};

export default errorHandler;