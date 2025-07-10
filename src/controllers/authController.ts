import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
	static async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res
					.status(400)
					.json({ error: "Email and password are required" });
			}

			const result = await AuthService.login(email, password);
			res.json(result);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}
}
