import { Router } from 'express';
import { sign } from 'jsonwebtoken';

import CreateUserService from '../services/CreateUserService';

const signUp = Router();

signUp.post('/api/users/signup', async (request, response) => {
  try {
    const { firstname, lastname, email, password } = request.body;

    const createNewUser = new CreateUserService();

    const user = await createNewUser.execute({
      firstname,
      lastname,
      email,
      password,
      isAdmin: false,
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

    return response.status(201).send(user);
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.error });
  }
});

export default signUp;
