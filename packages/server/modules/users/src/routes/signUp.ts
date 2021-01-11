import { Router } from 'express';
import { sign } from 'jsonwebtoken';

import CreateUserService from '../services/CreateUserService';

const signUp = Router();

signUp.post('/api/users/signup', async (request, response) => {
  const { firstname, lastname, email, password } = request.body;

  const createNewUser = new CreateUserService();

  const user = await createNewUser.execute({
    firstname,
    lastname,
    email,
    password,
    isAdmin: true,
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

  response.status(201).send(user);
});

export default signUp;
