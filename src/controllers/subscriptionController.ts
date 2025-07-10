import { Request, Response } from "express";
import { ProfileService } from "../services/profileService";

export class SubscriptionController {
	static async createSession(req: Request, res: Response) {
		try {
			const { creatorId, fanId } = req.body;

			const profile = await ProfileService.getProfileById(creatorId);
			if (!profile) {
				return res.status(404).json({ error: "Creator not found" });
			}

			res.status(201).json({
				sessionId: "psp_session_123456",
				paymentUrl: "https://psp.fakepay.com/session_123456",
				metadata: {
					fanId: fanId,
					creatorId: creatorId,
				},
				status: "CREATED",
			});
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}
}
