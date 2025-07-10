import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class MediaService {
	static async createMedia(
		profileId: string,
		mediaUrl: string,
		blurredMediaUrl: string
	) {
		return await prisma.media.create({
			data: {
				profileId,
				mediaUrl,
				blurredMediaUrl,
			},
		});
	}

	static async getMediasByProfileId(profileId: string) {
		return await prisma.media.findMany({
			where: { profileId },
			orderBy: { createdAt: "desc" },
		});
	}
}
