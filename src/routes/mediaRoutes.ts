import { Router } from "express";
import { MediaController } from "../controllers/mediaController";
import { authenticateToken } from "../middlewares/auth";
import { checkSubscription } from "../middlewares/subscription";

export const mediaRoutes = Router();

mediaRoutes.post(
	"/creators/:creatorId/medias",
	authenticateToken,
	MediaController.createMedia
);

mediaRoutes.get(
	"/creators/:creatorId/medias",
	[authenticateToken, checkSubscription],
	MediaController.getMedias
);
