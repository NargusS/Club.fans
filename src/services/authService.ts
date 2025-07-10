import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class AuthService {
	static async login(email: string, password: string) {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			const token = crypto.randomUUID();
			const user = await prisma.user.create({
				data: {
					email,
					password,
					token,
					profile: {
						create: {
							username: email.split("@")[0],
							monthlyPrice: 0,
						},
					},
				},
				include: {
					profile: true,
				},
			});

			return {
				id: user.id,
				token: user.token,
			};
		}

		if (user.password !== password) {
			throw new Error("Invalid password");
		}

		return {
			id: user.id,
			token: user.token,
		};
	}
}
