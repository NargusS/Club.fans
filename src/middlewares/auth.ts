import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const user = await prisma.user.findFirst({
      where: { token }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = user.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};