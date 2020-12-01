import { Router } from 'express';
import { sign } from 'jsonwebtoken';

import AuthUserService from '../services/AuthUserService';

const signIn = Router();

signIn.post('/api/users/signin', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authUser = new AuthUserService();
    const { user } = await authUser.execute({
      email,
      password,
    });

    const userJwt = sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    );

    request.session = {
      jwt: userJwt,
    };

    return response.json(user);
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.error });
  }
});

export default signIn;
