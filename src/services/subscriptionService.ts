import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class SubscriptionService {
	static async createSubscription(fanId: string, creatorId: string) {
		// Check if subscription already exists
		const existingSubscription = await prisma.subscription.findFirst({
			where: {
				fanId,
				creatorId
			}
		});

		if (existingSubscription) {
			throw new Error('Already subscribed to this creator');
		}

		return await prisma.subscription.create({
			data: {
				fanId,
				creatorId
			}
		});
	}
}