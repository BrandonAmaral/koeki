import express from 'express';
import cookieSession from 'cookie-session';

import signUp from './routes/signUp';
import signIn from './routes/signIn';
import signOut from './routes/signOut';
import userInfo from './routes/userInfo';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }),
);

app.use(signUp);
app.use(signIn);
app.use(signOut);
app.use(userInfo);

export default app;
