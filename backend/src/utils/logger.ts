import fs from 'fs';
import path from 'path';

// TODO: Add log rotation

const logFilePath = path.join(__dirname, '../../logs/app.log');
const errorFilePath = path.join(__dirname, '../../logs/error.log');

const fileLogStream = fs.createWriteStream(logFilePath, { flags: 'a' });
const errorLogStream = fs.createWriteStream(errorFilePath, { flags: 'a' });

const getCurrentDateTime = () => {
  const now = new Date();
  return `${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString().slice(0, 10)}`;
};

const formatLogMessage = (type: string, message: string, payload?: any) => {
  const formattedPayload = payload
    ? `\nPayload: ${JSON.stringify(payload, null, 2)}`
    : '';
  return `${getCurrentDateTime()} | ${type} | ${message}${formattedPayload}`;
};

const formatErrorMessage = (error: Error, payload?: any) => { 
  const stackTrace = error.stack ? `\nStack Trace: ${error.stack}` : '';
  const formattedPayload = payload
    ? `\nPayload: ${JSON.stringify(payload, null, 2)}`
    : '';
  return `${getCurrentDateTime()} | ERROR | ${
    error.message
  }${stackTrace}${formattedPayload}\n`;
};

const log = (message: string, payload?: any) => {
  const formattedMessage = formatLogMessage('INFO', message, payload);

  if (process.env.NODE_ENV === 'production') {
    fileLogStream.write(formattedMessage);
  } else if (process.env.NODE_ENV === 'development')
    console.log(formattedMessage);
};

const error = (error: Error, payload?: any) => {
  const formattedErrorMessage = formatErrorMessage(error, payload);

  if (process.env.NODE_ENV === 'development')
    console.error(formattedErrorMessage);
  else if (process.env.NODE_ENV === 'production') {
    errorLogStream.write(formattedErrorMessage);
  }
};

const cleanup = () => {
  fileLogStream.end();
  errorLogStream.end();
}

export default { log, error, cleanup };
