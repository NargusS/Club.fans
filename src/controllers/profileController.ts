import { Request, Response } from "express";
import { ProfileService } from "../services/profileService";
import { editProfileSchema } from "../schemas/profileSchema";

export class ProfileController {
	static async editProfile(req: Request, res: Response) {
		try {
			const userId = req.userId;
			const { username, monthlyPrice } = editProfileSchema.parse(req.body);
			const result = await ProfileService.editProfile(
				userId,
				username,
				monthlyPrice
			);
			res.json(result);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}

	static async getProfile(req: Request, res: Response) {
		try {
			const username = req.params.username;
			const result = await ProfileService.getProfileByUsername(username);
			if (!result) {
				return res.status(404).json({ error: "Profile not found" });
			}
			return res.status(200).json({
				id: result.id,
				username: result.username,
				monthlyPrice: result.monthlyPrice,
			});
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}
}
