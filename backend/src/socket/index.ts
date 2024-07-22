import { Request } from 'express';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import logger from '../utils/logger';

export const initializeSocketIO = (io: Server) => {
  return io.on('connection', async (socket: Socket) => {
    const token = uuidv4();
    logger.log(`Client connected`, token);

    socket.join(token);
  });
};

export const emitSocketEvent = (
  req: Request,
  roomId: string,
  event: string,
  payload?: string
) => {
  req.app.get('io').in(roomId).emit(event, payload);
};
