import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { loginSchema } from "../schemas/authSchema";

export class AuthController {
	static async login(req: Request, res: Response) {
		try {
			const { email, password } = loginSchema.parse(req.body);

			const result = await AuthService.login(email, password);
			res.json(result);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}
}
