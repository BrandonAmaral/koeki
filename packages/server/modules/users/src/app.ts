import express from 'express';
import cookieSession from 'cookie-session';

import { errorHandler, getUserInfo, NotFoundError } from '@koeki/common';
import signUp from './routes/signUp';
import signIn from './routes/signIn';
import signOut from './routes/signOut';
import userInfo from './routes/userInfo';
import isAdmin from './routes/isAdmin';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
);

app.use(getUserInfo);

app.use(signUp);
app.use(signIn);
app.use(signOut);
app.use(userInfo);
app.use(isAdmin);

app.all('*', async (request, response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
