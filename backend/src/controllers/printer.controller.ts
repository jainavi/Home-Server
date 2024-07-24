import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import path from 'path';

import { AppError } from '../utils/errors';
import { print as printCmd, cancelJob as cancelJobCmd } from '../utils/printer';
import logger from '../utils/logger';

export const print = asyncHandler(
  async (req: Request, res: Response, error: express.NextFunction) => {
    try {
      const cmdRes = await printCmd(
        path.join(__dirname, `../../${req.file?.path}`),
        req.query
      );
      logger.log(cmdRes.stdout, [
        `File: ${JSON.stringify(req.file)}`,
        `Query Obj: ${JSON.stringify(req.query)}`,
      ]);
    } catch (error) {
      throw new AppError('Failed to print the document', 500);
    }

    res.status(200).json({
      message: 'Printing in Process...',
    });
  }
);

export const cancelJob = asyncHandler(async (req, res, next) => {
  try {
    await cancelJobCmd();
  } catch (e) {
    throw new AppError('Failed to cancel the job', 500);
  }

  res.status(200).json({
    message: 'Job Cancelled',
  });
});
