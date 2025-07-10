import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class ProfileService {
	static async editProfile(
		userId: string,
		name?: string,
		monthlyPrice?: number
	) {
		return await prisma.profile.update({
			where: { userId },
			data: { name, monthlyPrice },
		});
	}
}
