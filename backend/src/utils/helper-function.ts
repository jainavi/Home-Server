import { promises as fsPromises } from 'fs';
import { exec } from 'child_process';
import path from 'path';

import { IExecResponse } from '../types';

export const makeDirectory = async (filePath: string) => {
  const dirname = path.dirname(filePath);

  try {
    await fsPromises.access(dirname);
  } catch (error) {
    await fsPromises.mkdir(dirname, { recursive: true });
  }
};

export const execAsync = async (cmd: string): Promise<IExecResponse> => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) reject(err);
      else resolve({ stdout, stderr });
    });
  });
};

