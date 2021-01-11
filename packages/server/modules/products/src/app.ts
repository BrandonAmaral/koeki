import express from 'express';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@koeki/common';
import listAll from './routes/listAll';
import create from './routes/create';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
);

app.use(listAll);
app.use(create);

app.all('*', async (request, response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
