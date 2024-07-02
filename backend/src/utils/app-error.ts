import { ValidHttpCode } from '../types';
import { HttpStatusCode } from './enums';

export default class AppError extends Error {
  public status: string;
  public isOperational: boolean;
  public httpCode: ValidHttpCode;

  constructor(
    message: string,
    httpCode?: ValidHttpCode,
    isOperational?: boolean
  ) {
    super(message);
    this.httpCode = httpCode || 500;
    this.status = httpCode ? HttpStatusCode[httpCode] : 'Internal Server Error';
    this.isOperational = isOperational || false;
    Error.captureStackTrace(this, this.constructor);
  }
}
