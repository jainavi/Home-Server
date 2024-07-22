import { ValidHttpCode } from '../types';
import { HttpStatusCode } from './enums';

export class AppError extends Error {
  public status: string;
  public isOperational: boolean;
  public httpCode: ValidHttpCode;
  public payload: any;

  constructor(
    message: string,
    payload?: any,
    httpCode?: ValidHttpCode,
    isOperational?: boolean, // Indicate error to be displayed to the client
  ) {
    super(message);
    this.httpCode = httpCode || 500;
    this.status = httpCode ? HttpStatusCode[httpCode] : 'Internal Server Error';
    this.isOperational = isOperational || true;
    this.payload = payload;
    Error.captureStackTrace(this, this.constructor);
  }
}
