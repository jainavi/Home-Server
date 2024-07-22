import asyncHandler from 'express-async-handler';

import { execAsync } from '../utils/helper-function';

export const shutdown = asyncHandler(async (req, res) => {
  execAsync('shutdown -h now');
  process.exit(0);
});
