import { Request, Response, NextFunction } from 'express';
import { CustomError } from './errorHandler';

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    const error: CustomError = new Error('Name is required and must be a non-empty string');
    error.statusCode = 400;
    return next(error);
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    const error: CustomError = new Error('Valid email is required');
    error.statusCode = 400;
    return next(error);
  }

  next();
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};