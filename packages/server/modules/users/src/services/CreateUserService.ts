import { hash } from 'bcryptjs';

import User, { UserDocument } from '../schemas/User';
import { BadRequestError } from '@koeki/common';

interface Request {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

class CreateUserService {
  public async execute({
    firstname,
    lastname,
    email,
    password,
    isAdmin,
  }: Request): Promise<UserDocument> {
    const checkEmail = await User.findOne({
      email,
    });

    if (checkEmail) {
      throw new BadRequestError('Email already in use');
    }

    const hashedPassword = await hash(password, 8);

    const user = User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      isAdmin,
    });

    return user;
  }
}

export default CreateUserService;
