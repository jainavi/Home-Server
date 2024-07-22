import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';

import { AppError } from './utils/errors';
import errorHandler from './middlewares/error-handler';
// import getToken from './middlewares/get-token';

import printRouter from './routes/printer.route';

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: ['*'], // TODO: Change this to the frontend URL
    credentials: true,
  },
});

/* Middlewares */
app.set("io", io);
app.use(
  cors({
    origin: ['*'], // TODO: Change this to the frontend URL
  })
);
app.use(express.json());

// app.use(getToken);

/* Routes */
app.use('/print', printRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(errorHandler);

export default app;
export { io, httpServer };
