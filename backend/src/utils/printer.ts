import { IExecResponse, IPrintOptions } from '../types';
import { execAsync } from './helper-function';
import { PrintQuality } from './enums';
import logger from './logger';

export const getDefaultPrinter = async () => {};

export const print = async (
  pdfPath: string,
  printOptions?: IPrintOptions
): Promise<IExecResponse> => {
  let {
    numberOfCopies = 1,
    toLandScape = false,
    pages = '',
    quality = 'normal',
  } = printOptions || {};

  // Print the file
  logger.log(
    'Printing the file...',
    `Print Options: ${JSON.stringify(printOptions)}`
  );
  return await execAsync(
    `lp -n ${numberOfCopies} -o collate=true -o media=A4 ${toLandScape ? '-o landscape' : ''} -o print-quality=${PrintQuality[quality]} ${pages === '' ? '' : `-P ${pages}`} '${pdfPath}'`
  );
};

export const cancelJob = async (jobId?: string) => {
  await execAsync(`cancel ${jobId ? jobId : '-a'}`);
};

export const showCurrentJobs = async () => {
  const res = (await execAsync('lpstat -W not-completed')).stdout
    .split('\n')
    .filter((job) => job !== '');

  return res;
};
