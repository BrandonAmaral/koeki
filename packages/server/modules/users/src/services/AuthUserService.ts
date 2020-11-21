import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { BadRequestError } from '@koeki/common';
import User, { UserDocument } from '../schemas/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: UserDocument;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new BadRequestError('Invalid credentials');
    }

    const token = sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    );

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
