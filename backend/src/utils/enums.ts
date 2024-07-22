const HttpStatusCode = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  409: 'Conflict',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  503: 'Service Unavailable',
} as const;

const PrintQuality = {
  draft: 3,
  normal: 4,
  best: 5,
} as const;

const SocketEvents = {
  connect: 'connect',
  printJobStatus: 'printJobStatus',
} as const;

export { HttpStatusCode, PrintQuality, SocketEvents };
