import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/NotAuthorizedError';

export function requireAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (!request.userInfo) {
    throw new NotAuthorizedError('Not authorized');
  }

  next();
}
