import { Router } from "express";
import { authenticateToken } from "../middlewares/auth";
import { SubscriptionController } from "../controllers/subscriptionController";

export const subscriptionRoutes = Router();

subscriptionRoutes.post(
	"/subscriptions/sessions",
	authenticateToken,
	SubscriptionController.createSession
);
