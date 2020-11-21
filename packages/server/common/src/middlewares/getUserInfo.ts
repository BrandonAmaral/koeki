import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      userInfo?: UserPayload;
    }
  }
}

export function getUserInfo(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (!request.session?.jwt) {
    return next();
  }

  try {
    const payload = verify(
      request.session.jwt,
      process.env.JWT_KEY!,
    ) as UserPayload;
    request.userInfo = payload;
  } catch (err) {}

  next();
}
