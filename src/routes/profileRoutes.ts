import { Router } from "express";
import { ProfileController } from "../controllers/profileController";

export const profileRoutes = Router();

profileRoutes.post("/edit", ProfileController.editProfile);
