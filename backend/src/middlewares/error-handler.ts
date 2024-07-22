import express, { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import logger from '../utils/logger';
import { HttpStatusCode } from '../utils/enums';

const errorHandler = (
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
    payload = undefined,
  } = err instanceof AppError ? err : {};

  logger.error(err, payload);

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
      payload, // Contains any additional Error data
    });
  }

  return res.status(httpCode).json({
    message,
    status,
    stack,
    err,
    payload,
  });
};

export default errorHandler;
