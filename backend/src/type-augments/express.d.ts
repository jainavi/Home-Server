import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    token?: string; // Unique token to identify the client
  }
}
