import { Request, Response } from "express";
import { MediaService } from "../services/mediaService";
import { ProfileService } from "../services/profileService";
import { createMediaSchema } from "../schemas/mediaSchema";

export class MediaController {
	static async createMedia(req: Request, res: Response) {
		try {
			const { creatorId } = req.params;
			const { mediaUrl, blurredMediaUrl } = createMediaSchema.parse(req.body);

			const profile = await ProfileService.getProfileById(creatorId);
			if (!profile) {
				return res.status(404).json({ error: "Creator not found" });
			}

			if (profile.userId !== req.userId) {
				return res
					.status(403)
					.json({ error: "Not authorized to post media for this creator" });
			}

			const media = await MediaService.createMedia(
				creatorId,
				mediaUrl,
				blurredMediaUrl
			);

			return res.status(201).json({
				mediaId: media.id,
				mediaUrl: media.mediaUrl,
				blurredMediaUrl: media.blurredMediaUrl,
			});
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	static async getMedias(req: Request, res: Response) {
		try {
			const { creatorId } = req.params;

			const profile = await ProfileService.getProfileById(creatorId);
			if (!profile) {
				return res.status(404).json({ error: "Creator not found" });
			}

			const medias = await MediaService.getMediasByProfileId(creatorId);
			if (profile.userId === req.userId || req.isSubscribed) {
				const formattedMedias = medias.map((media) => ({
					mediaId: media.id,
					mediaUrl: media.mediaUrl,
					blurredMediaUrl: media.blurredMediaUrl,
				}));
				return res.json(formattedMedias);
			}
			const formattedMedias = medias.map((media) => ({
				mediaId: media.id,
				blurredMediaUrl: media.blurredMediaUrl,
			}));
			return res.json(formattedMedias);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
