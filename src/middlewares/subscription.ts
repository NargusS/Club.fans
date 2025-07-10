import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

declare global {
	namespace Express {
		interface Request {
			isSubscribed?: boolean;
		}
	}
}

export const checkSubscription = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { creatorId } = req.params;
		const userId = req.userId;

		if (!userId) {
			req.isSubscribed = false;
			return next();
		}

		// Check if user is subscribed to this creator
		const subscription = await prisma.subscription.findFirst({
			where: {
				fanId: userId,
				creatorId: creatorId,
			},
		});

		req.isSubscribed = !!subscription;
		next();
	} catch (error) {
		req.isSubscribed = false;
		next();
	}
};
