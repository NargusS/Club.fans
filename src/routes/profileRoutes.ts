import { Router } from "express";
import { ProfileController } from "../controllers/profileController";
import { authenticateToken } from "../middlewares/auth";

export const profileRoutes = Router();

profileRoutes.post("/", authenticateToken, ProfileController.editProfile);
profileRoutes.get(
	"/:username",
	authenticateToken,
	ProfileController.getProfile
);
