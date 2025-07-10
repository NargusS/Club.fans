import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class ProfileService {
	static async editProfile(
		userId: string,
		username?: string,
		monthlyPrice?: number
	) {
		return await prisma.profile.update({
			where: { userId },
			data: { username, monthlyPrice },
		});
	}

	static async getProfileByUsername(username: string) {
		return await prisma.profile.findUnique({
			where: {
				username: username,
			},
		});
	}

	static async getProfileById(profileId: string) {
		return await prisma.profile.findUnique({
			where: { id: profileId },
		});
	}
}
