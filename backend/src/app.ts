import express from 'express';
import cors from 'cors';
import AppError from './utils/app-error';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(
  cors({
    origin: ['*'], // TODO: Change this to the frontend URL
  })
);
app.use(express.json());
app.use(express.static('public'));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`))
})

app.use(errorHandler);

export default app;
